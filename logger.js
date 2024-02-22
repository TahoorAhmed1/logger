const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');


const { combine, colorize, simple } = format;

const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console(),

    ],
    format: combine(colorize({ colors: { info: 'blue' } }), simple()),
});


const reqLogger = expressWinston.logger({
    transports: [new transports.Console()],
    format: combine(colorize(), simple()),
    meta: false,
    metaField: null,
    msg(req) {
        return `\n - Incoming request: {{req.method}} {{req.url}}\n - Request body: ${JSON.stringify(
            req.body,
        )}\n - Status code: {{res.statusCode}}\n - Response time: {{res.responseTime}}ms\n `;
    },
    colorize: true,
});

module.exports = { logger, reqLogger };