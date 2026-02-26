const schoolDataUrl = new URL("../assets/schooldata.json", import.meta.url);

async function fetchSchoolData() {
  const response = await fetch(schoolDataUrl);
  if (!response.ok) {
    throw new Error(
      `Could not load school data JSON: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

function buildLabels(years = 12, semestersPerYear = 2) {
  const labels = [];
  for (let year = 1; year <= years; year++) {
    for (let semester = 1; semester <= semestersPerYear; semester++) {
      labels.push(semester === semestersPerYear ? `${year}` : ``);
    }
  }
  return labels;
}

function extractDataPoints(subject) {
  const dataPoints = [];
  const sortedYears = Object.entries(subject.years || {}).sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  );

  for (const [, semesters] of sortedYears) {
    const sortedSemesters = Object.keys(semesters)
      .map(Number)
      .sort((a, b) => a - b);

    for (const semester of sortedSemesters) {
      const grade = semesters[semester];
      dataPoints.push(grade ?? null);
    }
  }

  return dataPoints;
}

export async function initializeChart(ctx) {
  const schoolData = await fetchSchoolData();
  const labels = buildLabels(schoolData.years, schoolData.semestersPerYear);

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 6,
          title: {
            display: true,
            text: "Note",
          },
          grid: {
            display: false, // Gitter der Y-Achse entfernen
          },
        },
        x: {
          title: {
            display: true,
            text: "Schuljahr",
          },
          grid: {
            display: false, // Gitter der X-Achse entfernen
          },
        },
      },
      plugins: {
        legend: {
          position: "right", // Hier wird die Legende nach rechts verschoben
        },
      },
    },
  });

  // Datenpunkte hinzufügen
  for (const subject of schoolData.subjects || []) {
    const dataPoints = extractDataPoints(subject);
    const subjectColor = subject.color || "black";
    const backgroundColor = subjectColor.includes("rgb")
      ? subjectColor.replace(")", ", 0.1)").replace("rgb", "rgba")
      : subjectColor;

    chart.data.datasets.push({
      label: subject.name,
      data: dataPoints,
      borderColor: subjectColor, // Direkt Farbe verwenden
      backgroundColor: backgroundColor,
      fill: false,
      spanGaps: true,
    });
  }
  return chart;
}
