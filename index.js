import { schoolData } from './modules/schooldata.js';
import { initializeChart } from './modules/chart_setup.js';

const ctx = document.getElementById('chart').getContext('2d');
const chart = initializeChart(ctx); // Initialisiere den Chart mit ctx

chart.update(); // Chart zeichnen

const datasetSelect = document.getElementById("datasetSelect");
datasetSelect.value = "average"; // Setzt "average" als Standardoption

// Dynamisch alle Subjects als Optionen hinzufügen (überspringt "all" und "mint")
Object.values(schoolData.subjects).filter(subject=> subject.name !== "Durchschnitt").forEach(subject => {
    const option = document.createElement("option");
    option.value = subject.name;       // z. B. "Mathe"
    option.textContent = subject.name; // z. B. "Mathe"
    datasetSelect.appendChild(option);
});

function createDataset(subject) {
    const dataPoints = [];

    // Gehe über die Jahre und Semester und sammle Noten
    for (const [year, yearObj] of Object.entries(subject.years)) {
        for (const [semester, semesterObj] of Object.entries(yearObj.semesters)) {
            dataPoints.push(semesterObj.getGrade() || null);
        }
    }
    
    const subjectColor = subject.color; // z. B. "blue" oder "rgb(0, 0, 255)"
    
    // Falls nötig: Umwandlung in RGBA, wenn du z. B. "rgb(...)" als Ausgang hast
    const backgroundColor = subjectColor.includes("rgb") 
        ? subjectColor.replace(')', ', 0.1)').replace('rgb', 'rgba')
        : subjectColor;
    
    return {
        label: subject.name,
        data: dataPoints,
        borderColor: subjectColor,
        backgroundColor: backgroundColor,
        fill: false,
        spanGaps: true
    };
}

function calculateOverallAverage(dataPoints) {
    // Entfernt null-Werte und berechnet den Durchschnitt der restlichen Werte
    const validDataPoints = dataPoints.filter(value => value !== null);
    const sum = validDataPoints.reduce((acc, value) => acc + value, 0);
    const average = validDataPoints.length > 0 ? sum / validDataPoints.length : 0;
    return average;
}

function updateAverageDisplay() {
    const selectedValue = datasetSelect.value;
    let subjects;
    if (selectedValue === "all") {
        // Alle Subjects außer "Durchschnitt" (falls vorhanden) zurückgeben
        subjects = Object.values(schoolData.subjects).filter(subject => subject.name !== "Durchschnitt");
    } else if (selectedValue === "mint") {
        const mintSubjects = ["Mathe", "Physik", "Chemie", "Informatik"];
        subjects = Object.values(schoolData.subjects).filter(subject => mintSubjects.includes(subject.name));
    } else {
        // Einzelnes Fach ausgewählt
        if (selectedValue === "average") {
            // Durchschnitt über
            subjects = [schoolData.getSubject("Durchschnitt")];
        } else {
            subjects = [schoolData.getSubject(selectedValue)];
        }
    }
    const allDataPoints = [];

    subjects.forEach(subject => {
        // Iteriere über alle Jahre und Semester des Faches
        for (const year of Object.values(subject.years)) {
            for (const semester of Object.values(year.semesters)) {
                const grade = semester.getGrade();
                if (grade !== null && grade !== undefined) {
                    allDataPoints.push(grade);
                }
            }
        }
    });

    // Berechne den Durchschnitt (null-Werte sind bereits ausgeschlossen)
    const overallAverage = calculateOverallAverage(allDataPoints);
    document.getElementById('averageDisplay').textContent = `Durchschnitt: ${overallAverage.toFixed(2)}`;
}


function updateChart() {
    const selectedValue = datasetSelect.value;
    
    // Leere zunächst die Datasets im Chart
    chart.data.datasets = [];
    
    if (selectedValue === "all") {
        // Alle Subjects einfügen
        Object.values(schoolData.subjects).forEach(subject => {
            chart.data.datasets.push(createDataset(subject));
        });
    } else if (selectedValue === "mint") {
        // Definiere eine Liste der MINT-Fächer (anpassen, falls nötig)
        const mintSubjects = ["Mathe", "Physik", "Chemie", "Informatik"];
        Object.values(schoolData.subjects).forEach(subject => {
            if (mintSubjects.includes(subject.name)) {
                chart.data.datasets.push(createDataset(subject));
            }
        });
    } else {
        // Es wurde ein einzelnes Fach ausgewählt
        let subject;
        if (selectedValue == "average") {
            subject = schoolData.getSubject("Durchschnitt");
        } else {
            subject = schoolData.getSubject(selectedValue);
        }

        if (subject) {
            chart.data.datasets.push(createDataset(subject));
        }
    }
    
    chart.update();
}

// Event-Listener: Sobald sich die Auswahl ändert, wird das Chart aktualisiert
datasetSelect.addEventListener("change", function() {
    // Aktualisiere den Chart und den Durchschnitt
    updateChart(); // Dein bestehender Chart-Update-Aufruf
    updateAverageDisplay(); // Berechne und zeige den Durchschnitt an
});

// Optional: Initiales Update (z. B. "all" standardmäßig)
updateChart();
updateAverageDisplay();