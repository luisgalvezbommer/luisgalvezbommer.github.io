class Semester {
    constructor() {
        this.grade = null;  // Speichert die Note für ein Semester
    }

    setGrade(grade) {
        this.grade = grade;
    }

    getGrade() {
        return this.grade || null;
    }
}

class Year {
    constructor() {
        this.semesters = {};

        // Automatisch 2 Semester pro Jahr hinzufügen
        for (let i = 1; i <= 2; i++) {
            this.semesters[i] = new Semester();
        }
    }

    getSemester(semesterNumber) {
        return this.semesters[semesterNumber] || null;
    }
}

class Subject {
    constructor(name, color) {
        this.name = name;
        this.years = {};
        this.color = color;

        // Automatisch 12 Jahre mit je 2 Semestern erstellen
        for (let i = 1; i <= 12; i++) {
            this.years[i] = new Year();
        }
    }

    getYear(yearNumber) {
        return this.years[yearNumber] || null;
    }
}

class SchoolData {
    constructor() {
        this.subjects = {};
    }

    addSubject(subjectName, color) {
        if (!this.subjects[subjectName]) {
            this.subjects[subjectName] = new Subject(subjectName, color);
        }
    }

    getSubject(subjectName) {
        return this.subjects[subjectName] || null;
    }
}

function calculateAverage(dataPoints) {
    // Filtere die null-Werte aus
    const validDataPoints = dataPoints.filter(value => value !== null);

    // Berechne den Durchschnitt nur aus den gültigen Werten
    const sum = validDataPoints.reduce((acc, value) => acc + value, 0);
    const average = validDataPoints.length > 0 ? sum / validDataPoints.length : null;

    return average;
}

// Nutzung der Klassen:
export const schoolData = new SchoolData();
schoolData.addSubject("Mathe", "blue");
schoolData.addSubject("Deutsch", "red");
schoolData.addSubject("Englisch", "aqua");
schoolData.addSubject("Physik", "darkblue");
schoolData.addSubject("Biologie", "green");
schoolData.addSubject("Chemie", "purple");
schoolData.addSubject("Geschichte", "brown");
schoolData.addSubject("Gemeinschaftskunde", "grey");
schoolData.addSubject("Erdkunde", "orange");
schoolData.addSubject("Sport", "darkred");
schoolData.addSubject("Kunst", "pink");
schoolData.addSubject("Musik", "yellow");
schoolData.addSubject("Informatik", "darkgreen");
schoolData.addSubject("Ethik", "lightblue");
schoolData.addSubject("Religion", "lightgreen");


// Jahr 1 gab es noch keine Noten

// Jahr 2 Semester 2
schoolData.getSubject("Mathe").getYear(2).getSemester(2).setGrade(1);
schoolData.getSubject("Deutsch").getYear(2).getSemester(2).setGrade(1);

// Jahr 3 Semester 1
schoolData.getSubject("Religion").getYear(3).getSemester(1).setGrade(2.3);
schoolData.getSubject("Deutsch").getYear(3).getSemester(1).setGrade(1.5);
schoolData.getSubject("Mathe").getYear(3).getSemester(1).setGrade(2);
schoolData.getSubject("Englisch").getYear(3).getSemester(1).setGrade(3);
schoolData.getSubject("Sport").getYear(3).getSemester(1).setGrade(3.3);

// Jahr 3 Semester 2
schoolData.getSubject("Religion").getYear(3).getSemester(2).setGrade(2);
schoolData.getSubject("Deutsch").getYear(3).getSemester(2).setGrade(2);
schoolData.getSubject("Mathe").getYear(3).getSemester(2).setGrade(2);
schoolData.getSubject("Englisch").getYear(3).getSemester(2).setGrade(2);
schoolData.getSubject("Sport").getYear(3).getSemester(2).setGrade(3);

// Jahr 4 Semester 1
schoolData.getSubject("Religion").getYear(4).getSemester(1).setGrade(2);
schoolData.getSubject("Deutsch").getYear(4).getSemester(1).setGrade(1.7);
schoolData.getSubject("Mathe").getYear(4).getSemester(1).setGrade(1.5);
schoolData.getSubject("Englisch").getYear(4).getSemester(1).setGrade(1.5);
schoolData.getSubject("Sport").getYear(4).getSemester(1).setGrade(2);

// Jahr 4 Semester 2
schoolData.getSubject("Religion").getYear(4).getSemester(2).setGrade(2);
schoolData.getSubject("Deutsch").getYear(4).getSemester(2).setGrade(2);
schoolData.getSubject("Mathe").getYear(4).getSemester(2).setGrade(2);
schoolData.getSubject("Englisch").getYear(4).getSemester(2).setGrade(1);
schoolData.getSubject("Sport").getYear(4).getSemester(2).setGrade(2);



// Füge "Durchschnitt" als Fach hinzu
schoolData.addSubject("Durchschnitt", "black");

// Berechne den Durchschnitt für jedes Semester
for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 2; j++) {
        const dataPoints = [];
        for (const subject of Object.values(schoolData.subjects)) {
            if (subject) {
                const grade = subject.getYear(i).getSemester(j).getGrade();
                dataPoints.push(grade);
            }
        }
        const average = calculateAverage(dataPoints);
        schoolData.getSubject("Durchschnitt").getYear(i).getSemester(j).setGrade(average);
    }
}
