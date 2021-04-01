import logger from './config/winston.js';
import {handleError} from './helpers/errors.js';
import app from './server.js';

const port = 3000;
global.fileName = './json/grades.json';

app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`)
})

app.use((err, req, res, next) => {
    handleError(err, res);
});
