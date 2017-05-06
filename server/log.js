import winston from 'winston';
import path from 'path';

/**
  In production, you're probably not going to want
  your error logs in a directory like this.
*/

const LOGGER_FILE_NAME = 'errors.log';
const LOGGER_FILE_DIR = path.join(process.cwd(), 'server');
const LOGGER_FILE_PATH = path.join(LOGGER_FILE_DIR, LOGGER_FILE_NAME);

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: LOGGER_FILE_PATH,
    }),
  ],
});

export default logger;
