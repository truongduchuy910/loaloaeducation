const { Wit, log } = require('node-wit');
const client = new Wit({
    accessToken: 'ZVNFK6C27X3NSKSLJZATHA3GNY45UC77',
    logger: new log.Logger(log.DEBUG) // optional
});
module.exports = client;