import appRoot from 'app-root-path';
import winston from 'winston';

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: 'silly',
        filename: `${appRoot}/logs/grade-api.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

export default new winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    format: combine(label({label: 'grade-api'}), timestamp(), myFormat),
    exitOnError: false, // do not exit on handled exceptions
});
