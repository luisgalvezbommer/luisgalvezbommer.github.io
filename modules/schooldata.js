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

    setPointstoGrade(points) {
        if (points == 0) {
            this.grade = 6;
        } else {
            this.grade = Math.round(((17 - points) / 3) * 10) / 10;
        }
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
schoolData.addSubject("Französisch", "lightgreen");
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
schoolData.addSubject("Naturwissenschaft und Technik", "gold");


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

// Jahr 5 Semester 1
schoolData.getSubject("Deutsch").getYear(5).getSemester(1).setGrade(2.5);
schoolData.getSubject("Erdkunde").getYear(5).getSemester(1).setGrade(2);
schoolData.getSubject("Englisch").getYear(5).getSemester(1).setGrade(2.5);
schoolData.getSubject("Mathe").getYear(5).getSemester(1).setGrade(2);
schoolData.getSubject("Biologie").getYear(5).getSemester(1).setGrade(1.7);
schoolData.getSubject("Sport").getYear(5).getSemester(1).setGrade(2.5);
schoolData.getSubject("Musik").getYear(5).getSemester(1).setGrade(2.7);
schoolData.getSubject("Kunst").getYear(5).getSemester(1).setGrade(1.7);

// Jahr 5 Semester 2
schoolData.getSubject("Deutsch").getYear(5).getSemester(2).setGrade(3);
schoolData.getSubject("Erdkunde").getYear(5).getSemester(2).setGrade(2);
schoolData.getSubject("Englisch").getYear(5).getSemester(2).setGrade(2);
schoolData.getSubject("Mathe").getYear(5).getSemester(2).setGrade(2);
schoolData.getSubject("Biologie").getYear(5).getSemester(2).setGrade(2);
schoolData.getSubject("Sport").getYear(5).getSemester(2).setGrade(3);
schoolData.getSubject("Musik").getYear(5).getSemester(2).setGrade(2);
schoolData.getSubject("Kunst").getYear(5).getSemester(2).setGrade(2);

// Jahr 6 Semester 1
schoolData.getSubject("Deutsch").getYear(6).getSemester(1).setGrade(3);
schoolData.getSubject("Erdkunde").getYear(6).getSemester(1).setGrade(2.3);
schoolData.getSubject("Geschichte").getYear(6).getSemester(1).setGrade(4);
schoolData.getSubject("Englisch").getYear(6).getSemester(1).setGrade(3);
schoolData.getSubject("Französisch").getYear(6).getSemester(1).setGrade(2.5);
schoolData.getSubject("Mathe").getYear(6).getSemester(1).setGrade(2.3);
schoolData.getSubject("Biologie").getYear(6).getSemester(1).setGrade(2.3);
schoolData.getSubject("Sport").getYear(6).getSemester(1).setGrade(2);
schoolData.getSubject("Musik").getYear(6).getSemester(1).setGrade(2.5);
schoolData.getSubject("Kunst").getYear(6).getSemester(1).setGrade(3.5);

// Jahr 6 Semester 2
schoolData.getSubject("Deutsch").getYear(6).getSemester(2).setGrade(3);
schoolData.getSubject("Erdkunde").getYear(6).getSemester(2).setGrade(2);
schoolData.getSubject("Geschichte").getYear(6).getSemester(2).setGrade(4);
schoolData.getSubject("Englisch").getYear(6).getSemester(2).setGrade(3);
schoolData.getSubject("Französisch").getYear(6).getSemester(2).setGrade(3);
schoolData.getSubject("Mathe").getYear(6).getSemester(2).setGrade(2);
schoolData.getSubject("Biologie").getYear(6).getSemester(2).setGrade(2);
schoolData.getSubject("Sport").getYear(6).getSemester(2).setGrade(3);
schoolData.getSubject("Musik").getYear(6).getSemester(2).setGrade(3);
schoolData.getSubject("Kunst").getYear(6).getSemester(2).setGrade(3);

// Jahr 7 Semester 1
schoolData.getSubject("Ethik").getYear(7).getSemester(1).setGrade(4);
schoolData.getSubject("Deutsch").getYear(7).getSemester(1).setGrade(3.5);
schoolData.getSubject("Erdkunde").getYear(7).getSemester(1).setGrade(2.7);
schoolData.getSubject("Geschichte").getYear(7).getSemester(1).setGrade(3.7);
schoolData.getSubject("Englisch").getYear(7).getSemester(1).setGrade(3.3);
schoolData.getSubject("Französisch").getYear(7).getSemester(1).setGrade(2.7);
schoolData.getSubject("Mathe").getYear(7).getSemester(1).setGrade(3);
schoolData.getSubject("Physik").getYear(7).getSemester(1).setGrade(3);
schoolData.getSubject("Biologie").getYear(7).getSemester(1).setGrade(2.7);
schoolData.getSubject("Sport").getYear(7).getSemester(1).setGrade(2);
schoolData.getSubject("Musik").getYear(7).getSemester(1).setGrade(3);
schoolData.getSubject("Kunst").getYear(7).getSemester(1).setGrade(1);

// Jahr 7 Semester 2
schoolData.getSubject("Ethik").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Deutsch").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Erdkunde").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Geschichte").getYear(7).getSemester(2).setGrade(4);
schoolData.getSubject("Englisch").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Französisch").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Mathe").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Physik").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Biologie").getYear(7).getSemester(2).setGrade(3);
schoolData.getSubject("Sport").getYear(7).getSemester(2).setGrade(2);
schoolData.getSubject("Musik").getYear(7).getSemester(2).setGrade(4);
schoolData.getSubject("Kunst").getYear(7).getSemester(2).setGrade(2);

// Jahr 8 Semester 1
schoolData.getSubject("Deutsch").getYear(8).getSemester(1).setGrade(3.7);
schoolData.getSubject("Erdkunde").getYear(8).getSemester(1).setGrade(4);
schoolData.getSubject("Geschichte").getYear(8).getSemester(1).setGrade(4);
schoolData.getSubject("Gemeinschaftskunde").getYear(8).getSemester(1).setGrade(3.5);
schoolData.getSubject("Englisch").getYear(8).getSemester(1).setGrade(3.5);
schoolData.getSubject("Französisch").getYear(8).getSemester(1).setGrade(3);
schoolData.getSubject("Mathe").getYear(8).getSemester(1).setGrade(3.3);
schoolData.getSubject("Physik").getYear(8).getSemester(1).setGrade(3.7);
schoolData.getSubject("Chemie").getYear(8).getSemester(1).setGrade(2);
schoolData.getSubject("Sport").getYear(8).getSemester(1).setGrade(2.3);
schoolData.getSubject("Musik").getYear(8).getSemester(1).setGrade(3.5);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(8).getSemester(1).setGrade(3);

// Jahr 8 Semester 2
schoolData.getSubject("Deutsch").getYear(8).getSemester(2).setGrade(4);
schoolData.getSubject("Erdkunde").getYear(8).getSemester(2).setGrade(3);
schoolData.getSubject("Geschichte").getYear(8).getSemester(2).setGrade(4);
schoolData.getSubject("Gemeinschaftskunde").getYear(8).getSemester(2).setGrade(4);
schoolData.getSubject("Englisch").getYear(8).getSemester(2).setGrade(3);
schoolData.getSubject("Französisch").getYear(8).getSemester(2).setGrade(3);
schoolData.getSubject("Mathe").getYear(8).getSemester(2).setGrade(3);
schoolData.getSubject("Physik").getYear(8).getSemester(2).setGrade(4);
schoolData.getSubject("Chemie").getYear(8).getSemester(2).setGrade(2);
schoolData.getSubject("Sport").getYear(8).getSemester(2).setGrade(2);
schoolData.getSubject("Musik").getYear(8).getSemester(2).setGrade(3);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(8).getSemester(2).setGrade(3);

// Jahr 9 Semester 1
schoolData.getSubject("Ethik").getYear(9).getSemester(1).setGrade(3.5);
schoolData.getSubject("Deutsch").getYear(9).getSemester(1).setGrade(3.7);
schoolData.getSubject("Geschichte").getYear(9).getSemester(1).setGrade(4.3);
schoolData.getSubject("Gemeinschaftskunde").getYear(9).getSemester(1).setGrade(3.7);
schoolData.getSubject("Englisch").getYear(9).getSemester(1).setGrade(3.5);
schoolData.getSubject("Französisch").getYear(9).getSemester(1).setGrade(3.3);
schoolData.getSubject("Mathe").getYear(9).getSemester(1).setGrade(3.3);
schoolData.getSubject("Physik").getYear(9).getSemester(1).setGrade(4.5);
schoolData.getSubject("Chemie").getYear(9).getSemester(1).setGrade(4);
schoolData.getSubject("Biologie").getYear(9).getSemester(1).setGrade(4.3);
schoolData.getSubject("Sport").getYear(9).getSemester(1).setGrade(1.5);
schoolData.getSubject("Kunst").getYear(9).getSemester(1).setGrade(2.5);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(9).getSemester(1).setGrade(2.3);

// Jahr 9 Semester 2
schoolData.getSubject("Ethik").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Deutsch").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Geschichte").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Gemeinschaftskunde").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Englisch").getYear(9).getSemester(2).setGrade(3);
schoolData.getSubject("Französisch").getYear(9).getSemester(2).setGrade(3);
schoolData.getSubject("Mathe").getYear(9).getSemester(2).setGrade(3);
schoolData.getSubject("Physik").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Chemie").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Biologie").getYear(9).getSemester(2).setGrade(4);
schoolData.getSubject("Sport").getYear(9).getSemester(2).setGrade(2);
schoolData.getSubject("Kunst").getYear(9).getSemester(2).setGrade(2);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(9).getSemester(2).setGrade(3);

// Jahr 10 Semester 1
schoolData.getSubject("Ethik").getYear(10).getSemester(1).setGrade(3.5);
schoolData.getSubject("Deutsch").getYear(10).getSemester(1).setGrade(4.5);
schoolData.getSubject("Erdkunde").getYear(10).getSemester(1).setGrade(3.3);
schoolData.getSubject("Geschichte").getYear(10).getSemester(1).setGrade(4);
schoolData.getSubject("Gemeinschaftskunde").getYear(10).getSemester(1).setGrade(4.5);
schoolData.getSubject("Englisch").getYear(10).getSemester(1).setGrade(3.5);
schoolData.getSubject("Französisch").getYear(10).getSemester(1).setGrade(2.7);
schoolData.getSubject("Mathe").getYear(10).getSemester(1).setGrade(3.5);
schoolData.getSubject("Physik").getYear(10).getSemester(1).setGrade(3.3);
schoolData.getSubject("Chemie").getYear(10).getSemester(1).setGrade(3.7);
schoolData.getSubject("Biologie").getYear(10).getSemester(1).setGrade(4.3);
schoolData.getSubject("Sport").getYear(10).getSemester(1).setGrade(2.3);
schoolData.getSubject("Musik").getYear(10).getSemester(1).setGrade(4);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(10).getSemester(1).setGrade(3.7);

// Jahr 10 Semester 2
schoolData.getSubject("Ethik").getYear(10).getSemester(2).setGrade(4);
schoolData.getSubject("Deutsch").getYear(10).getSemester(2).setGrade(4);
schoolData.getSubject("Erdkunde").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Geschichte").getYear(10).getSemester(2).setGrade(4);
schoolData.getSubject("Gemeinschaftskunde").getYear(10).getSemester(2).setGrade(4);
schoolData.getSubject("Englisch").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Französisch").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Mathe").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Physik").getYear(10).getSemester(2).setGrade(2);
schoolData.getSubject("Chemie").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Biologie").getYear(10).getSemester(2).setGrade(4);
schoolData.getSubject("Sport").getYear(10).getSemester(2).setGrade(2);
schoolData.getSubject("Musik").getYear(10).getSemester(2).setGrade(3);
schoolData.getSubject("Kunst").getYear(10).getSemester(2).setGrade(2);
schoolData.getSubject("Naturwissenschaft und Technik").getYear(10).getSemester(2).setGrade(3);

// Oberstufe Deutsch
schoolData.getSubject("Deutsch").getYear(11).getSemester(1).setPointstoGrade(3);
schoolData.getSubject("Deutsch").getYear(11).getSemester(2).setPointstoGrade(6);
schoolData.getSubject("Deutsch").getYear(12).getSemester(1).setPointstoGrade(8);
schoolData.getSubject("Deutsch").getYear(12).getSemester(2).setPointstoGrade(9);

// Oberstufe Englisch
schoolData.getSubject("Englisch").getYear(11).getSemester(1).setPointstoGrade(6);
schoolData.getSubject("Englisch").getYear(11).getSemester(2).setPointstoGrade(7);
schoolData.getSubject("Englisch").getYear(12).getSemester(1).setPointstoGrade(7);
schoolData.getSubject("Englisch").getYear(12).getSemester(2).setPointstoGrade(7);

// Oberstufe Kunst
schoolData.getSubject("Kunst").getYear(11).getSemester(1).setPointstoGrade(10);
schoolData.getSubject("Kunst").getYear(11).getSemester(2).setPointstoGrade(11);
schoolData.getSubject("Kunst").getYear(12).getSemester(1).setPointstoGrade(10);
schoolData.getSubject("Kunst").getYear(12).getSemester(2).setPointstoGrade(12);

// Oberstufe Geschichte
schoolData.getSubject("Geschichte").getYear(11).getSemester(1).setPointstoGrade(8);
schoolData.getSubject("Geschichte").getYear(11).getSemester(2).setPointstoGrade(7);
schoolData.getSubject("Geschichte").getYear(12).getSemester(1).setPointstoGrade(8);
schoolData.getSubject("Geschichte").getYear(12).getSemester(2).setPointstoGrade(8);

// Oberstufe Gemeinschaftskunde
schoolData.getSubject("Gemeinschaftskunde").getYear(11).getSemester(1).setPointstoGrade(5);
schoolData.getSubject("Gemeinschaftskunde").getYear(12).getSemester(2).setPointstoGrade(5);

// Oberstufe Erdkunde
schoolData.getSubject("Erdkunde").getYear(11).getSemester(2).setPointstoGrade(10);
schoolData.getSubject("Erdkunde").getYear(12).getSemester(1).setPointstoGrade(6);


// Oberstufe Ethik
schoolData.getSubject("Ethik").getYear(11).getSemester(1).setPointstoGrade(5);
schoolData.getSubject("Ethik").getYear(11).getSemester(2).setPointstoGrade(5);
schoolData.getSubject("Ethik").getYear(12).getSemester(1).setPointstoGrade(7);
schoolData.getSubject("Ethik").getYear(12).getSemester(2).setPointstoGrade(6);

// Oberstufe Mathe
schoolData.getSubject("Mathe").getYear(11).getSemester(1).setPointstoGrade(11);
schoolData.getSubject("Mathe").getYear(11).getSemester(2).setPointstoGrade(12);
schoolData.getSubject("Mathe").getYear(12).getSemester(1).setPointstoGrade(8);
schoolData.getSubject("Mathe").getYear(12).getSemester(2).setPointstoGrade(12);

// Oberstufe Physik
schoolData.getSubject("Physik").getYear(11).getSemester(1).setPointstoGrade(11);
schoolData.getSubject("Physik").getYear(11).getSemester(2).setPointstoGrade(11);
schoolData.getSubject("Physik").getYear(12).getSemester(1).setPointstoGrade(9);
schoolData.getSubject("Physik").getYear(12).getSemester(2).setPointstoGrade(12);

// Oberstufe Biologie
schoolData.getSubject("Biologie").getYear(11).getSemester(1).setPointstoGrade(8);
schoolData.getSubject("Biologie").getYear(11).getSemester(2).setPointstoGrade(7);
schoolData.getSubject("Biologie").getYear(12).getSemester(1).setPointstoGrade(10);
schoolData.getSubject("Biologie").getYear(12).getSemester(2).setPointstoGrade(9);

// Oberstufe Sport
schoolData.getSubject("Sport").getYear(11).getSemester(1).setPointstoGrade(11);
schoolData.getSubject("Sport").getYear(11).getSemester(2).setPointstoGrade(9);
schoolData.getSubject("Sport").getYear(12).getSemester(1).setPointstoGrade(13);
schoolData.getSubject("Sport").getYear(12).getSemester(2).setPointstoGrade(8);

// Oberstufe Informatik
schoolData.getSubject("Informatik").getYear(11).getSemester(1).setPointstoGrade(7);
schoolData.getSubject("Informatik").getYear(11).getSemester(2).setPointstoGrade(4);


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
