const puppeteer = require('puppeteer');
var database = require('./database');
module.exports = {
    test: function () {
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
            var newTitles = new Array;
            titles.forEach(title => {
                database.find({
                    title: title
                }, (err, docs) => {
                    if (docs.length == 0) {
                        newTitles.push(title);
                        database.insertMany({ title: title }, (err, docs) => {
                            console.log(docs);
                        })
                    }
                })
            });
            await browser.close();
        })();
    }
}