const puppeteer = require("puppeteer");
const axios = require("axios");

const updateShop = async () => {
  let loginUrl = "https://fulfillment.omniva.lv/web/login";
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto(loginUrl);
  await page.waitForSelector("#login");

  await page.type("#login", "sakov.p@gmail.com");
  await page.type("#password", "Test13371337");
  await page.keyboard.press("Enter");

  await page.waitForSelector("#wrapwrap");
  let productUrl = "https://fulfillment.omniva.lv/products";
  await page.goto(productUrl);
  await page.waitForSelector("#wrapwrap");

  //#region Main Scraper

  let productData = await page.evaluate(() => {
    let allProducts = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData2 = await page.evaluate(() => {
    let allProducts2 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts2.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts2;
  });
  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData3 = await page.evaluate(() => {
    let allProducts3 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts3.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts3;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData4 = await page.evaluate(() => {
    let allProducts4 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts4.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts4;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData5 = await page.evaluate(() => {
    let allProducts5 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts5.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts5;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData6 = await page.evaluate(() => {
    let allProducts6 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts6.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts6;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData7 = await page.evaluate(() => {
    let allProducts7 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts7.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts7;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData8 = await page.evaluate(() => {
    let allProducts8 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts8.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts8;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData9 = await page.evaluate(() => {
    let allProducts9 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts9.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts9;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData10 = await page.evaluate(() => {
    let allProducts10 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts10.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts10;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData11 = await page.evaluate(() => {
    let allProducts11 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts11.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts11;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData12 = await page.evaluate(() => {
    let allProducts12 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts12.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts12;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData13 = await page.evaluate(() => {
    let allProducts13 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts13.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts13;
  });

  //do same on next page
  await page.waitForSelector("#wrapwrap");
  await page.click("div.products_pager ul li a.page-link-next");
  await page.waitForSelector("#wrapwrap");

  let productData14 = await page.evaluate(() => {
    let allProducts14 = [];
    let products = Array.from(
      document.querySelectorAll("div.table-responsive table.table tbody tr td")
    ).map((product) => product.innerText);
    // Get all products where 1 item in array is name, 2nd item is SKU and 4th item is quantity
    for (let i = 0; i < products.length; i += 4) {
      allProducts14.push({
        name: products[i],
        sku: products[i + 1],
        quantity: products[i + 3],
      });
    }
    return allProducts14;
  });

  let omnivaStock = productData.concat(
    productData2,
    productData3,
    productData4,
    productData5,
    productData6,
    productData7,
    productData8,
    productData9,
    productData10,
    productData11,
    productData12,
    productData13,
    productData14
  );
  // #endregion
  await browser.close();

  //console.log(omnivaStock);

  const productApi = (omnivaStock) => {

 // for each item in omnivaStock
    omnivaStock.forEach(async (item) => {
        let sku = item.sku;
        let quantity = parseInt(item.quantity.split("/")[0])

        axios
        .get(
          `https://smartmom.shop/wp-json/wc/v3/products?sku=${sku}&consumer_key=ck_580fcdbfc9bd331bd7471c716503b11432d35065&consumer_secret=cs_738a34b443cf792cd4c6938a62e6b6dd0508fb2a`
        )
        .then((response) => {
          id = response.data[0].id;
          axios
            .put(
              `https://smartmom.shop/wp-json/wc/v3/products/${id}?consumer_key=ck_580fcdbfc9bd331bd7471c716503b11432d35065&consumer_secret=cs_738a34b443cf792cd4c6938a62e6b6dd0508fb2a`,
              { stock_quantity: quantity }
            )
            .then((response) => {
              return console.log('all went good')
            })
            .catch((error) => {
              console.log('error in put');
            });
        })
        .catch((error) => {
          console.log('error in get');
        });
    })

    }

   

  productApi(omnivaStock);
};

module.exports = setInterval(updateShop, 9000000);
