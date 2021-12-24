'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const cron = require('node-cron');
const path = require('path');
const express = require('express');


const app = express();
const port = process.env.PORT || 8080;

const sourceData = [
  {
    name: 'Morele',
    type: 'morele',
    url: 'https://www.morele.net/kategoria/karty-graficzne-12/,,,,,,,p,0,,,,8143O1689340.1827334/1/',
    selectors: {
      list: '.cat-list-products .cat-product',
      name: '.cat-product-name .productLink',
      url: '.cat-product-name .productLink',
      price: '.price-new'
    }
  },
  {
    name: 'X-Kom',
    type: 'xkom',
    url: 'https://www.x-kom.pl/szukaj?per_page=90&sort_by=accuracy_desc&q=rtx%203080&f%5Bgroups%5D%5B5%5D=1&f%5Bcategories%5D%5B345%5D=1',
    selectors: {
      list: '.sc-162ysh3-1',
      name: '.sc-1h16fat-0 h3',
      url: '.sc-1h16fat-0',
      price: '.sc-6n68ef-3'
    }
  },
  {
    name: 'Komputronik',
    type: 'komputronik',
    url: 'https://www.komputronik.pl/category/1099/karty-graficzne.html?a%5B507%5D%5B%5D=128316&filter=1&showBuyActiveOnly=1',
    selectors: {
      list: '.product-entry2-wrap .product-entry2',
      name: '.blank-link',
      url: '.blank-link',
      price: '.pe2-price'
    }
  },
  {
    name: 'Ole',
    type: 'ole',
    url: 'https://www.oleole.pl/karty-graficzne,typ-chipsetu!geforce-rtx-3080:geforce-rtx-3080-ti.bhtml',
    selectors: {
      list: '#products .product-for-list',
      name: '.product-name .js-save-keyword',
      url: '.product-name .js-save-keyword',
      price: '.product-price .price-normal'
    }
  },
  {
    name: 'Media Expert',
    type: 'media-expert',
    url: 'https://www.mediaexpert.pl/komputery-i-tablety/podzespoly-komputerowe/karty-graficzne/model_geforce-rtx-3080-ti.geforce-rtx-3080?limit=50&page=1',
    selectors: {
      list: '#section_list-items .offers-list > span',
      name: '.offer-box .content .box .name a',
      url: '.offer-box .content .box .name a',
      price: '.main-price'
    }
  },
  {
    name: 'Proline',
    type: 'proline',
    url: 'https://proline.pl/?g=Karty+graficzne&kat=Karty+graficzne+PCI-E&stan=dostepne&c_chipset-model=rtx+3080',
    selectors: {
      list: '.cennik tr',
      name: 'a.produkt',
      url: 'a.produkt',
      price: 'td.c'
    }
  },
  {
    name: 'Euro',
    type: 'euro',
    url: 'https://www.euro.com.pl/karty-graficzne,typ-chipsetu!geforce-rtx-3080:geforce-rtx-3080-ti.bhtml',
    selectors: {
      list: '#products .product-for-list',
      name: '.product-name .js-save-keyword',
      url: '.product-name .js-save-keyword',
      price: '.product-price .price-normal'
    }
  },
  {
    name: 'Sferis',
    type: 'sferis',
    url: 'https://www.sferis.pl/karty-graficzne-2889?f=a807%3A653958.615032&l=all',
    selectors: {
      list: '#list .product',
      name: 'a.title',
      url: 'a.title',
      price: '.price__part'
    }
  }
];


cron.schedule('*/5 * * * *', async () => {
  const targetData = [];

  for (const [index, shop] of sourceData.entries()) {
    await new Promise(async resolve => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(shop.url, {waitUntil: 'networkidle0', timeout: 0});

      const data = await page.$$eval(shop.selectors.list, (list, shop) => {
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
          }
        }).filter(el => el.price !== 0);
      }, shop).catch(() => []);

      console.log(`${index + 1}/${sourceData.length} - ${shop.name}`);

      await browser.close();

      await resolve(data);
    }).then((data) => targetData.push(data));
  }

  const data = targetData.flat().sort((a, b) => a.price - b.price);
  const createdAt = new Date();

  console.log('updated: ', createdAt);

  fs.writeFileSync(__dirname + '/../public/data.json', JSON.stringify({
    createdAt,
    data
  }));
});

app.use(express.static(__dirname + '/../public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);

console.log('Server started at http://localhost:' + port);

