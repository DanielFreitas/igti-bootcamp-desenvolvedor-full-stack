import {promises} from 'fs';
import moment from 'moment';

const {readFile, writeFile} = promises;

class Grade {
    constructor(grade) {
        this.id = grade.id;
        this.student = grade.student;
        this.subject = grade.subject;
        this.type = grade.type;
        this.value = grade.value;
        this.timestamp = grade.timestamp;
    }
    static async createGrade(grade, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));

            grade = {
                id: data.nextId ++,
                student: grade.student,
                subject: grade.subject,
                type: grade.type,
                value: grade.value,
                timestamp: moment().toISOString()
            };

            data.grades.push(grade);

            await writeFile(global.fileName, JSON.stringify(data, null, 2));

            result(null, grade);
        } catch (error) {
            result(error, null);
        }
    }

    static async updateGrade(grade, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));
            const index = data.grades.findIndex(g => g.id === grade.id);

            grade = {
                ...grade,
                timestamp: moment().toISOString()
            };

            data.grades[index] = grade;

            await writeFile(global.fileName, JSON.stringify(data, null, 2));

            result(null, data.grades[index]);
        } catch (error) {
            result(error, null);
        }
    }

    static async deleteGrade(gradeId, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));
            data.grades = data.grades.filter(g => g.id !== gradeId);
            await writeFile(global.fileName, JSON.stringify(data, null, 2));

            result(null, {
                status: 'success',
                message: "Grade deleted successfully!"
            });
        } catch (error) {
            result(error, null);
        }
    }

    static async getGrade(gradeId, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));
            const grade = data.grades.find(g => g.id === gradeId);

            result(null, grade);
        } catch (error) {
            result(error, null);
        }
    }

    static async getTotalGrades(student, subject, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));

            let grade = data.grades.filter(g => {
                return(student === g.student && subject === g.subject);
            });

            if (JSON.stringify(grade) === '{}') {
                result(null, {
                    status: 'error',
                    message: "Grade not found!"
                });
            } else {
                let total = grade.reduce((acc, cur) => {
                    return acc += parseInt(cur.value);
                }, 0);

                const g = grade.find(e => e.id === grade[0].id);

                grade = {
                    student: g.student,
                    subject: g.subject,
                    value: total
                }
            }

            result(null, grade);
        } catch (error) {
            result(error, null);
        }
    }

    static async getMediaGrades(subject, type, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));

            let grade = data.grades.filter(g => {
                return(type === g.type && subject === g.subject);
            });

            if (JSON.stringify(grade) === '{}') {
                result(null, {
                    status: 'error',
                    message: "Grade not found!"
                });
            } else {
                let total = grade.reduce((acc, cur) => {
                    return acc += parseInt(cur.value);
                }, 0);

                const g = grade.find(e => e.id === grade[0].id);

                grade = {
                    subject: g.subject,
                    type: g.type,
                    media: total / grade.length
                }
            }

            result(null, grade);
        } catch (error) {
            result(error, null);
        }
    }

    static async getTopThreeGrades(subject, type, result) {
        try {
            const data = JSON.parse(await readFile(global.fileName));

            let grade = data.grades.filter(g => {
                return(type === g.type && subject === g.subject);
            });

            if (JSON.stringify(grade) === '{}') {
                result(null, {
                    status: 'error',
                    message: "Grade not found!"
                });
            } else {
                grade = grade.sort((a, b) => {
                    return b.value - a.value
                }).slice(0, 3);
            }

            result(null, grade);
        } catch (error) {
            result(error, null);
        }
    }
}


export default Grade;
