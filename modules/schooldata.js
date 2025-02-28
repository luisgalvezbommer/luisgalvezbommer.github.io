class Semester {
    constructor() {
        this.grade = null;  // Speichert die Noten für ein Semester
    }

    setGrade(grade) {
        this.grades = grade;
    }

    getGrade() {
        return this.grade || null;
    }
}

class Year {
    constructor() {
        this.semesters = {};
    }

    addSemester(semesterNumber) {
        if (!this.semesters[semesterNumber]) {
            this.semesters[semesterNumber] = new Semester();
        }
    }

    getSemester(semesterNumber) {
        return this.semesters[semesterNumber] || null;
    }
}

class Subject {
    constructor(name) {
        this.name = name;
        this.years = {};
    }

    addYear(yearNumber) {
        if (!this.years[yearNumber]) {
            this.years[yearNumber] = new Year();
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

    addSubject(subjectName) {
        if (!this.subjects[subjectName]) {
            this.subjects[subjectName] = new Subject(subjectName);
        }
    }

    getSubject(subjectName) {
        return this.subjects[subjectName] || null;
    }
}

// Nutzung der Klassen:
export const schooldata = new SchoolData();
schooldata.addSubject("Mathe");
schooldata.getSubject("Mathe").addYear("1");
schooldata.getSubject("Mathe").getYear("1").addSemester("1");
schooldata.getSubject("Mathe").getYear("1").getSemester("1").setGrade("Exam", 1);

console.log(schooldata.getSubject("Mathe").getYear("1").getSemester("1").getGrade());
