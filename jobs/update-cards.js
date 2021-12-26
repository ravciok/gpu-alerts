const puppeteer = require("puppeteer");
const Card = require("../DB/Card");

const updateCards = async (sourceData) => {
  await Card.deleteMany();

  for (const [index, shop] of sourceData.entries()) {
    await new Promise(async resolve => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(shop.url, {waitUntil: 'networkidle0', timeout: 0});

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
        }).filter(el => el.price !== 0);
      }, shop);

      console.log(`${index + 1}/${sourceData.length} - ${shop.name}`);

      await browser.close();
      await Card.insertMany(data, null, (err, res) => {
        if (err) {
          console.log('err: ', err);
        }

        resolve()
      });
    });
  }

  console.log('updated: ', new Date().toLocaleString('pl-PL'));
}

module.exports = updateCards;
