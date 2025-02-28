import { schooldata } from './modules/schooldata.js';

// Datensätze als Array von Objekten (jetzt mit 24 Werten)
// Hinweis: Letzter Datenpunkt repräsentiert X=12.5
const datasets = [
{
    name: "Mathe",
    // 24 Werte => x = 1 + index*0.5 => letzter x = 1 + (23*0.5) = 12.5
    values: [null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null],
    color: "blue"
},
{
    name: "Deutsch",
    values: [null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null],
    color: "red"
},
{
    name: "Englisch",
    values: [null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null],
    color: "aqua"
}
];

const avg = {
    name: "Durchschnitt",
    values: datasets[0].values.map((_, index) => {
        // Hole alle Werte für diesen Index aus allen Datensätzen
        const valuesAtIndex = datasets.map(d => d.values[index]);
        // Filtere alle null oder undefined Werte heraus
        const validValues = valuesAtIndex.filter(v => v !== null && v !== undefined);
        // Berechne den Durchschnitt, falls es gültige Werte gibt, sonst null
        return validValues.length > 0 
        ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length 
        : null;
    }),
    color: "black"
};

datasets.push(avg);

const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const selectEl = document.getElementById('datasetSelect');

// Füge die Optionen ins Select-Element ein
datasets.forEach(dataset => {
const option = document.createElement('option');
option.value = dataset.name;
option.textContent = dataset.name;
selectEl.appendChild(option);
});

// Bereich für X-Achse: 1 .. 12.5 (weil wir 24 Punkte in 0.5-Schritten haben)
const xAxisMin = 1;
const xAxisMax = 12.5; 
// Bereich für Y-Achse: 1 .. 6 (1 oben, 6 unten)
const yAxisMin = 1;
const yAxisMax = 6;

// Zeichne das Diagramm (Beispiel ohne Selektion)
drawChart(datasets.map(d => d.name)); // alle Datensätze

function drawChart(selectedDatasetNames) {
// Canvas leeren
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Ränder
const margin = 50;
const chartWidth = canvas.width - margin * 2;
const chartHeight = canvas.height - margin * 2;

// === X- und Y-Achse zeichnen ===
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.beginPath();
// Y-Achse (links, von oben nach unten)
ctx.moveTo(margin, margin);
ctx.lineTo(margin, margin + chartHeight);
// X-Achse (unten, von links nach rechts)
ctx.lineTo(margin + chartWidth, margin + chartHeight);
ctx.stroke();

// === Y-Achse beschriften: Werte 1 bis 6 ===
ctx.font = "12px Arial";
ctx.textAlign = 'right';
ctx.textBaseline = 'middle';
const yRange = yAxisMax - yAxisMin; // 6 - 1 = 5
for (let i = yAxisMin; i <= yAxisMax; i++) {
    // i läuft 1..6
    let yVal = i;
    // Normalisierung [yAxisMin..yAxisMax] -> [0..1]
    let normalizedY = (yVal - yAxisMin) / yRange; 
    // Y-Position (oben=margin, unten=margin+chartHeight)
    let yPos = margin + normalizedY * chartHeight;
    // Da 1 oben sein soll, 6 unten: invertieren
    // => yPos = margin + (1 - normalizedY)*chartHeight
    //   oder wir drehen die Schleife um.
    // Hier machen wir es simpler: 1 oben, 6 unten => 
    //   i=1 => normalizedY=0 => yPos= margin
    //   i=6 => normalizedY=1 => yPos= margin+chartHeight
    // => wir nehmen also: yPos = margin + normalizedY * chartHeight
    ctx.fillText(yVal, margin - 10, yPos);

    // Hilfslinien
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin, yPos);
    ctx.lineTo(margin + chartWidth, yPos);
    ctx.stroke();
    // Reset
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
}

// === X-Achse beschriften: nur ganze Zahlen 1..12 ===
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
for (let i = 1; i <= 12; i++) {
    let xVal = i;
    // Normalisierung [xAxisMin..xAxisMax] -> [0..1]
    let normalizedX = (xVal - xAxisMin) / (xAxisMax - xAxisMin);
    let xPos = margin + normalizedX * chartWidth;
    ctx.fillText(xVal, xPos, margin + chartHeight + 10);
}

// === Ausgewählte Datensätze zeichnen ===
selectedDatasetNames.forEach(datasetName => {
    const dataset = datasets.find(d => d.name === datasetName);
    if (!dataset) return;

    ctx.strokeStyle = dataset.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let isDrawing = false;

    // Wir gehen von i=0..23 (24 Werte)
    dataset.values.forEach((value, index) => {
    // 0-Werte oder null => Linie unterbrechen
    if (!value) {
        isDrawing = false;
        return;
    }

    // X-Wert in 0.5er-Schritten
    let xVal = xAxisMin + index * 0.5; 
    // Normalisieren
    let normalizedX = (xVal - xAxisMin) / (xAxisMax - xAxisMin);
    let xPos = margin + normalizedX * chartWidth;

    // Y-Wert normalisieren (1 oben, 6 unten)
    let normalizedY = (value - yAxisMin) / (yRange); 
    let yPos = margin + normalizedY * chartHeight;

    if (!isDrawing) {
        // ersten gültigen Punkt anfahren
        ctx.moveTo(xPos, yPos);
        isDrawing = true;
    } else {
        // Linie zum nächsten Punkt
        ctx.lineTo(xPos, yPos);
    }
    });

    ctx.stroke();
});
}


function updateLegend(selectedDatasets) {
    const legendContainer = document.getElementById("legend");
    legendContainer.innerHTML = ""; // Leere die Legende

    selectedDatasets.forEach(name => {
        const dataset = datasets.find(d => d.name === name);
        if (dataset) {
            const legendItem = document.createElement("div");
            legendItem.style.display = "flex";
            legendItem.style.alignItems = "center";
            legendItem.style.marginBottom = "5px";

            const colorCircle = document.createElement("div");
            colorCircle.style.width = "15px";
            colorCircle.style.height = "15px";
            colorCircle.style.borderRadius = "50%";
            colorCircle.style.backgroundColor = dataset.color;
            colorCircle.style.marginRight = "10px";

            const label = document.createElement("span");
            label.textContent = dataset.name;

            legendItem.appendChild(colorCircle);
            legendItem.appendChild(label);
            legendContainer.appendChild(legendItem);
        }
    });
}

function handleSelection() {
const selectedOptions = Array.from(selectEl.selectedOptions).map(opt => opt.value);
let selectedDatasets = [];

if (selectedOptions.includes("all")) {
    selectedDatasets = datasets.map(d => d.name);
} else if (selectedOptions.includes("mint")) {
    selectedDatasets = ["Datensatz A", "Datensatz B"];
} else {
    selectedDatasets = selectedOptions;
}

drawChart(selectedDatasets);
updateLegend(selectedDatasets);
}

// Setze "Alle Datensätze" als Standard und lade sie
window.onload = function() {
    selectEl.value = "all";
    selectEl.dispatchEvent(new Event('change'));
};

// Aktualisiere das Diagramm, wenn sich die Auswahl ändert
selectEl.addEventListener('change', handleSelection);

// Initial: Wähle den ersten Datensatz aus
if (selectEl.options.length > 0) {
selectEl.options[0].selected = true;
drawChart([selectEl.options[0].value]);
}

// Funktion zum Anpassen des Canvas beim Ändern der Fenstergröße
function resizeChart() {
    let canvas = document.getElementById("myChart");
    let container = document.getElementById("chart-container");

    canvas.width = container.clientWidth; // Neue Breite setzen
    canvas.height = container.clientWidth * 0.6; // Höhe anpassen (Verhältnis beibehalten)

    chart.update(); // Chart neu rendern

    // Achsenbezeichner neu positionieren
    positionLabels();
}

// Funktion zum Neupositionieren der Achsenbezeichner
function positionLabels() {
    let xLabel = document.getElementById('xLabel');
    let yLabel = document.getElementById('yLabel');

    // Die Positionen beibehalten, auch wenn die Größe sich ändert
    xLabel.style.left = '50%';
    xLabel.style.transform = 'translateX(-50%)';

    yLabel.style.top = '50%';
    yLabel.style.transform = 'translateY(-50%)';
}

// Event-Listener für das Resize-Event
window.addEventListener("resize", resizeChart);

// Beim Laden direkt einmal aufrufen
resizeChart();