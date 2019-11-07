const puppeteer = require('puppeteer');
var database = require('./database');
var ms = require('../messenger/models')
module.exports = {
    dut: function (req, res) {
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('file:///home/truongduchuy910/apps/loaloa/testHtml/G_Thongbao.aspx.html');

            // Get the "viewport" of the page, as reported by the page.
            const titles = await page.evaluate(() => {
                var titles = [...document.getElementsByClassName('MsoNormal')]
                for (var i = 0; i < titles.length; i++) {
                    titles[i] = titles[i].innerText;
                }
                return titles;
            });
            titles.forEach(title => {
                database.find({
                    title: title
                }, (err, docs) => {
                    if (docs.length == 0) {
                        ms.broadcast.creating_broadcast_messages(
                            [ms.views.dut(title)],
                            (err, message) => {
                                ms.broadcast.sending_broadcast_messages(
                                    message.message_creative_id, (err, broadcast) => {
                                        ms.db.broadcast.insertMany({
                                            user: 'dut',
                                            broadcast_id: broadcast.broadcast_id,
                                            message_creative_id: message.message_creative_id
                                        })
                                    })
                            }
                        )
                        database.insertMany({ title: title }, (err, docs) => {
                        })
                    }
                })
            });
            await browser.close();
            res.send({
                success: true
            })
        })(

        );
    }
}