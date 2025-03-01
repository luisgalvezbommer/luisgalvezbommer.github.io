import { schoolData } from './schooldata.js';

// Labels für die X-Achse generieren (Jahr 1 - Sem 1 bis Jahr 12 - Sem 2)
const labels = [];
for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 2; j++) {
        if (j == 2) labels.push(`${i}`);
        else labels.push(``);
    }
}

// Notendaten aus `schoolData` extrahieren
const grades = {};
for (const subject of Object.values(schoolData.subjects)) {
    if (subject) {
        const dataPoints = [];
        for (const [year, yearObj] of Object.entries(subject.years)) {
            for (const [semester, semesterObj] of Object.entries(yearObj.semesters)) {               
                dataPoints.push(semesterObj.getGrade() || null);
            }
        }
        grades[subject.name] = dataPoints;
    }
}

export function initializeChart(ctx) {
    const chart =  new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: []
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 6,
                    title: {
                        display: true,
                        text: 'Note'
                    },
                    grid: {
                        display: false // Gitter der Y-Achse entfernen
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Schuljahr'
                    },
                    grid: {
                        display: false // Gitter der X-Achse entfernen
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'right' // Hier wird die Legende nach rechts verschoben
                }
            }
        }
    });
    // Datenpunkte hinzufügen
    for (const [subject, dataPoints] of Object.entries(grades)) {
        const subjectColor = schoolData.getSubject(subject).color; // Farbe des Fachs

        chart.data.datasets.push({
            label: subject,
            data: dataPoints,
            borderColor: subjectColor, // Direkt Farbe verwenden
            backgroundColor: subjectColor.replace(')', ', 0.1)').replace('rgb', 'rgba'),
            fill: false,
            spanGaps: true
        });
    }
    return chart;
}




