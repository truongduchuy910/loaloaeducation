const puppeteer = require('puppeteer');
var database = require('./database');
var ms = require('../messenger/models').public
var wit = require('../wit.ai/models')
module.exports = {
    dut: function (req, res) {
        (async () => {
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.goto('http://sv.dut.udn.vn/G_Thongbao.aspx');
            var titles = await page.evaluate(() => {
                var titles = [...document.getElementsByClassName('MsoNormal')]
                for (var i = 0; i < titles.length; i++) {
                    titles[i] = titles[i].innerText;
                }
                return titles;
            });
            titles.forEach(title => {
                database.find({
                    title: title
                }, async (err, docs) => {
                    if (docs.length == 0) {
                        console.log(title);

                        var { message_creative_id } = await ms.broadcast.creating_broadcast(
                            [ms.views.dut_G_Thongbao(title)]
                        )
                        var { broadcast_id } = await ms.broadcast.broadcast(
                            message_creative_id
                        )

                        database.insertMany(
                            {
                                title: title,
                                broadcast_id: broadcast_id
                            }, (err, docs) => {
                            })
                    }
                })
            });

            await page.goto('http://sv.dut.udn.vn/G_Thongbao_LopHP.aspx');
            titles = await page.evaluate(() => {
                var titles = [...document.getElementsByClassName('MsoNormal')]
                for (var i = 0; i < titles.length; i++) {
                    titles[i] = titles[i].innerText;
                }
                return titles;
            });
            titles.forEach(title => {
                database.find({
                    title: title
                }, async (err, docs) => {
                    if (docs.length == 0) {
                        console.log(title);

                        // var { message_creative_id } = await ms.broadcast.creating_broadcast(
                        //     [ms.views.dut_G_Thongbao_LopHP(title)]
                        // )
                        // var { broadcast_id } = await ms.broadcast.broadcast(
                        //     message_creative_id
                        // )


                        database.insertMany(
                            {
                                title: title,
                                broadcast_id: "broadcast_id"
                            }, (err, docs) => {
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
