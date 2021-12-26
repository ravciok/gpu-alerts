const cardsConfig = [
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
  },
  {
    name: 'PC Projekt',
    type: 'pcprojekt',
    url: 'https://www.pcprojekt.pl/szukaj?controller=search&orderby=position&orderway=desc&search_query=rtx+3080&submit_search=',
    selectors: {
      list: '.product_list > li',
      name: 'a.product-name',
      url: 'a.product-name',
      price: '.content_price'
    }
  },
  {
    name: 'Fox Komputer',
    type: 'fox',
    url: 'https://foxkomputer.pl/pl/c/Karty-graficzne/53/1/default/1/f_at_489_2273/1/f_at_489_2335/1',
    selectors: {
      list: '.products > .product',
      name: 'a.prodname',
      url: 'a.prodname',
      price: '.price'
    }
  }
];

module.exports = cardsConfig;