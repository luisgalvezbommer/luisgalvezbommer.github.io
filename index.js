import { initializeChart } from "./modules/chart_setup.js";

const schoolDataUrl = new URL("./assets/schooldata.json", import.meta.url);

async function fetchSchoolData() {
  const response = await fetch(schoolDataUrl);
  if (!response.ok) {
    throw new Error(
      `Could not load school data JSON: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

const schoolData = await fetchSchoolData();
const subjects = schoolData.subjects || [];
const subjectByName = new Map(
  subjects.map((subject) => [subject.name, subject]),
);

const ctx = document.getElementById("chart").getContext("2d");
const chart = await initializeChart(ctx); // Initialisiere den Chart mit ctx

chart.update(); // Chart zeichnen

const datasetSelect = document.getElementById("datasetSelect");
datasetSelect.value = "average"; // Setzt "average" als Standardoption

// Dynamisch alle Subjects als Optionen hinzufügen (überspringt "all" und "mint")
subjects
  .filter((subject) => subject.name !== "Durchschnitt")
  .forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.name; // z. B. "Mathe"
    option.textContent = subject.name; // z. B. "Mathe"
    datasetSelect.appendChild(option);
  });

function createDataset(subject) {
  const dataPoints = [];

  // Gehe über die Jahre und Semester und sammle Noten
  const sortedYears = Object.entries(subject.years || {}).sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  );

  for (const [, semesters] of sortedYears) {
    const sortedSemesters = Object.keys(semesters)
      .map(Number)
      .sort((a, b) => a - b);

    for (const semester of sortedSemesters) {
      dataPoints.push(semesters[semester] ?? null);
    }
  }

  const subjectColor = subject.color || "black"; // z. B. "blue" oder "rgb(0, 0, 255)"

  // Falls nötig: Umwandlung in RGBA, wenn du z. B. "rgb(...)" als Ausgang hast
  const backgroundColor = subjectColor.includes("rgb")
    ? subjectColor.replace(")", ", 0.1)").replace("rgb", "rgba")
    : subjectColor;

  return {
    label: subject.name,
    data: dataPoints,
    borderColor: subjectColor,
    backgroundColor: backgroundColor,
    fill: false,
    spanGaps: true,
  };
}

function calculateOverallAverage(dataPoints) {
  // Entfernt null-Werte und berechnet den Durchschnitt der restlichen Werte
  const validDataPoints = dataPoints.filter((value) => value !== null);
  const sum = validDataPoints.reduce((acc, value) => acc + value, 0);
  const average = validDataPoints.length > 0 ? sum / validDataPoints.length : 0;
  return average;
}

function updateAverageDisplay() {
  const selectedValue = datasetSelect.value;
  let selectedSubjects;
  if (selectedValue === "all") {
    // Alle Subjects außer "Durchschnitt" (falls vorhanden) zurückgeben
    selectedSubjects = subjects.filter(
      (subject) => subject.name !== "Durchschnitt",
    );
  } else if (selectedValue === "mint") {
    const mintSubjects = ["Mathe", "Physik", "Chemie", "Informatik"];
    selectedSubjects = subjects.filter((subject) =>
      mintSubjects.includes(subject.name),
    );
  } else {
    // Einzelnes Fach ausgewählt
    if (selectedValue === "average") {
      // Durchschnitt über
      selectedSubjects = [subjectByName.get("Durchschnitt")];
    } else {
      selectedSubjects = [subjectByName.get(selectedValue)];
    }
  }
  const allDataPoints = [];

  selectedSubjects.forEach((subject) => {
    if (!subject) return;
    // Iteriere über alle Jahre und Semester des Faches
    for (const semesters of Object.values(subject.years || {})) {
      for (const grade of Object.values(semesters)) {
        if (grade !== null && grade !== undefined) {
          allDataPoints.push(grade);
        }
      }
    }
  });

  // Berechne den Durchschnitt (null-Werte sind bereits ausgeschlossen)
  const overallAverage = calculateOverallAverage(allDataPoints);
  document.getElementById("averageDisplay").textContent =
    `Durchschnitt: ${overallAverage.toFixed(2)}`;
}

function updateChart() {
  const selectedValue = datasetSelect.value;

  // Leere zunächst die Datasets im Chart
  chart.data.datasets = [];

  if (selectedValue === "all") {
    // Alle Subjects einfügen
    subjects.forEach((subject) => {
      chart.data.datasets.push(createDataset(subject));
    });
  } else if (selectedValue === "mint") {
    // Definiere eine Liste der MINT-Fächer (anpassen, falls nötig)
    const mintSubjects = ["Mathe", "Physik", "Chemie", "Informatik"];
    subjects.forEach((subject) => {
      if (mintSubjects.includes(subject.name)) {
        chart.data.datasets.push(createDataset(subject));
      }
    });
  } else {
    // Es wurde ein einzelnes Fach ausgewählt
    let subject;
    if (selectedValue === "average") {
      subject = subjectByName.get("Durchschnitt");
    } else {
      subject = subjectByName.get(selectedValue);
    }

    if (subject) {
      chart.data.datasets.push(createDataset(subject));
    }
  }

  chart.update();
}

// Event-Listener: Sobald sich die Auswahl ändert, wird das Chart aktualisiert
datasetSelect.addEventListener("change", function () {
  // Aktualisiere den Chart und den Durchschnitt
  updateChart(); // Dein bestehender Chart-Update-Aufruf
  updateAverageDisplay(); // Berechne und zeige den Durchschnitt an
});

// Optional: Initiales Update (z. B. "all" standardmäßig)
updateChart();
updateAverageDisplay();
