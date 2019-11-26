const { Wit, log } = require('node-wit');
const client = new Wit({
    accessToken: 'URQTIXPUQOAO6ZWQKP5HX7GGDXC7HVTM',
    logger: new log.Logger(log.DEBUG) // optional
});
module.exports = {
    message: async (text) => {
        var entities = await client.message(text)
    }
}
