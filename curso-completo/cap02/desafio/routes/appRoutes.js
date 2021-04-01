import express from 'express';
import todoList from '../controller/gradeController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'Server is running!'})
});

router.post('/grade', async (req, res, next) => {
    try {
        res.send(await todoList.createGrade(req, res));
    } catch (error) {
        next(error);
    }
});

router.put('/grade', async (req, res, next) => {
    try {
        res.send(await todoList.updateGrade(req, res));
    } catch (error) {
        next(error);
    }
});

router.delete('/grade/:id', async (req, res, next) => {
    try {
        res.send(await todoList.deleteGrade(req, res));
    } catch (error) {
        next(error);
    }
});

router.get('/grade/:id', async (req, res, next) => {
    try {
        res.send(await todoList.getGrade(req, res));
    } catch (error) {
        next(error);
    }
});

router.get('/grade/total/student/:student/subject/:subject', async (req, res, next) => {
    try {
        res.send(await todoList.getTotalGrades(req, res));
    } catch (error) {
        next(error);
    }
});

router.get('/grade/media/subject/:subject/type/:type', async (req, res, next) => {
    try {
        res.send(await todoList.getMediaGrades(req, res));
    } catch (error) {
        next(error);
    }
});

router.get('/grade/topthree/subject/:subject/type/:type', async (req, res, next) => {
    try {
        res.send(await todoList.getTopThreeGrades(req, res));
    } catch (error) {
        next(error);
    }
});

export default router;
