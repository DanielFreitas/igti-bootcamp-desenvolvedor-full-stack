import {ErrorHandler} from '../helpers/errors.js';
import Grade from '../model/gradeModel.js';

async function createGrade(req, res) {
    let newGrade = new Grade(req.body);

    if (! newGrade.student || ! newGrade.subject || ! newGrade.type || ! newGrade.value) {
        throw new ErrorHandler(400, 'Please provide a valid student/subject/type/value');
    } else {
        await Grade.createGrade(newGrade, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function updateGrade(req, res) {
    let newGrade = new Grade(req.body);

    if (! newGrade.id || ! newGrade.student || ! newGrade.subject || ! newGrade.type || ! newGrade.value) {
        throw new ErrorHandler(400, 'Please provide a valid id/student/subject/type/value');
    } else {
        await Grade.updateGrade(newGrade, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function deleteGrade(req, res) {
    let gradeId = parseInt(req.params.id);

    if (!Number.isInteger(gradeId) || gradeId < 0) {
        throw new ErrorHandler(400, 'Please provide a valid id');
    } else {
        await Grade.deleteGrade(gradeId, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function getGrade(req, res) {
    let gradeId = parseInt(req.params.id);

    if (!Number.isInteger(gradeId) || gradeId < 0) {
        throw new ErrorHandler(400, 'Please provide a valid id');
    } else {
        await Grade.getGrade(gradeId, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function getTotalGrades(req, res) {
    let student = req.params.student;
    let subject = req.params.subject;

    if (! student || ! subject) {
        throw new ErrorHandler(400, 'Please provide a valid student/subject');
    } else {
        await Grade.getTotalGrades(student, subject, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function getMediaGrades(req, res) {
    let subject = req.params.subject;
    let type = req.params.type;

    if (! subject || ! type) {
        throw new ErrorHandler(400, 'Please provide a valid student/subject');
    } else {
        await Grade.getMediaGrades(subject, type, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};

async function getTopThreeGrades(req, res) {
    let subject = req.params.subject;
    let type = req.params.type;

    if (! subject || ! type) {
        throw new ErrorHandler(400, 'Please provide a valid student/subject');
    } else {
        await Grade.getTopThreeGrades(subject, type, function (error, grade) {
            if (error) {
                throw new ErrorHandler(500, error)
            }
            res.json(grade);
        });
    }
};


export default {
    createGrade,
    updateGrade,
    deleteGrade,
    getGrade,
    getTotalGrades,
    getMediaGrades,
    getTopThreeGrades
};
