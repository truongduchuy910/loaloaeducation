const { Wit, log } = require('node-wit');
const client = new Wit({
    accessToken: 'ZVNFK6C27X3NSKSLJZATHA3GNY45UC77',
    logger: new log.Logger(log.DEBUG) // optional
});
// var request = require('request')

// for (var i = 14; i < 19; i++) {
//     for (var j = 1; j < 9; j++) {
//         var label;
//         var temp = `${i}.Nh${j}`;
//         var oppo = `${i}N${j}`;

//         request(
//             {
//                 'uri': `https://api.wit.ai/entities/label/values`,
//                 'headers': {
//                     'Authorization': 'Bearer ZVNFK6C27X3NSKSLJZATHA3GNY45UC77',
//                     'Content-Type': 'application/json'
//                 },
//                 'json': {
//                     'value': temp,
//                     'expressions': [temp, oppo],
//                     'metadata': 'LABEL'
//                 },
//                 'method': 'POST',
//             },
//             (err, response, body) => {
//                 console.log('create_label', err, body)
//             }
//         )
//     }
// }
module.exports = {
    message: async (text) => {
        var entities = await client.message(text)
        console.log(entities)
    }
}
