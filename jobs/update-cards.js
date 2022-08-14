const puppeteer = require("puppeteer");
const Card = require("../DB/Card");
const sendEmail = require("./send-mail");

const updateCards = async (sourceData) => {
  await Card.deleteMany();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  for (const [index, shop] of sourceData.entries()) {
    await new Promise(async resolve => {
      await page.goto(shop.url, {waitUntil: 'load', timeout: 0}).catch(() => resolve());

      const data = await page.$$eval(shop.selectors.list, (list, shop) => {
        const createdAt = new Date().getTime();

        function completePrice(el) {
          let priceAsString = (el || {innerText: ''}).innerText
            .replace(/\n/g, ',')
            .replace(/,\t|,zł|zł|\s/g, '')
            .replace(/,/g, '.');

          return priceAsString * 1;
        }

        return list.map(el => {
          return {
            name: (el.querySelector(shop.selectors.name) || {innerText: ''}).innerText.replace(/[\t\n]/g, ''),
            url: (el.querySelector(shop.selectors.url) || {href: ''}).href,
            shop: shop.name,
            price: completePrice(el.querySelector(shop.selectors.price)),
            createdAt
          }
        }).filter(el => !!el.price);
      }, shop).catch(() => []);

      console.log(`${index + 1}/${sourceData.length} - ${shop.name} - ${!!data.length}`);

      if (process.env.ALERT_PRICE) {
        data.forEach(el => {
          if (el.price <= process.env.ALERT_PRICE) {
            sendEmail(`${el.price.toLocaleString('pl-PL', {minimumFractionDigits: 2})}zł - ${el.name}`, el.url);
          }
        });
      }

      await Card.insertMany(data, null, (err, res) => {
        if (err) {
          console.log('err: ', err);
        }

        resolve()
      });
    });
  }

  await browser.close();

  console.log('updated: ', new Date().toLocaleString('pl-PL'));
}

module.exports = updateCards;
