const WintsonLogger = require('winston');

const successfullLogger = WintsonLogger.createLogger({
    level: 'info',
    format: WintsonLogger.format.json(),
    transports: [new WintsonLogger.transports.Console()]
});

const failedLogger = WintsonLogger.createLogger({
    level: 'error',
    format: WintsonLogger.format.json(),
    transports: [new WintsonLogger.transports.Console()]
})

module.exports = {
    successfullLogger,
    failedLogger
};