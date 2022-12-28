const winston = require('winston');
require('winston-daily-rotate-file');
const transport = new (winston.transports.DailyRotateFile)({
  filename: './logs/error-%DATE%.log.log',
  datePattern: 'YYYY-MM-DD',
  utc: true,
  zippedArchive: false,
  maxFiles: '7d',
});

const log = winston.createLogger({
  transports: [
    transport,
  ],
});

function error(errorMsg:string) {
  log.error({ timeStamp: new Date().toUTCString(), error: errorMsg });
}

function info(data:any){
  log.info({ timeStamp: new Date().toUTCString(), data });
}

export = { error, info }

