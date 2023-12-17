// const url = "https://www.kleinanzeigen.de";

export default async (req, res) => {
  // try {
  // if (req.method === "POST") {
  //   const { brand, model, kmMin, kmMax } = req.body;
  //   const browser = await puppeteer.connect({
  //     browserWSEndpoint: `wss://chrome.browserless.io?token=802e3c6d-7b73-46f2-8bf6-c19b3be3783f`,
  //   });

  //   const page = await browser.newPage();
  //   await page.goto(
  //     `${url}/s-autos/${brand}/c216+autos.km_i:${kmMin}%2C${kmMax}+autos.marke_s:${brand}+autos.model_s:${model}`
  //   );
  //   await page.waitForSelector("#srchrslt-adtable");
  //   let el = await page.evaluate(() => {
  //     const ul = document.body.querySelectorAll(".aditem-main");
  //     let datas = [];
  //     Object.values(ul).map((item) => {
  //       let product = {};
  //       // eliminate ads
  //       if (
  //         item.parentElement.parentElement
  //           .getAttribute("class")
  //           .includes("is-topad")
  //       )
  //         return;
  //       const itemUrl = item.querySelector(".ellipsis").getAttribute("href");
  //       product.id = itemUrl.split("/").at(-1);
  //       product.url = `https://www.kleinanzeigen.de${itemUrl}`;
  //       product.title = item.querySelector("h2").innerText;
  //       product.description = item.querySelector(
  //         ".aditem-main--middle--description"
  //       ).innerText;
  //       product.location = item.querySelector(
  //         ".aditem-main--top--left"
  //       ).innerText;
  //       product.date = item.querySelector(
  //         ".aditem-main--top--right"
  //       ).innerText;
  //       product.price = item
  //         .querySelector(".aditem-main--middle--price-shipping--price")
  //         .innerText.replace("VB", "")
  //         .replace("€", "")
  //         .replace(" ", "")
  //         .replace(" ", "")
  //         .replace(".", "");
  //       let tags = item
  //         .querySelector(".text-module-end")
  //         .innerText.split("\n");
  //       product.km = +tags
  //         .find((tag) => tag.includes("km"))
  //         .replace(" km", "")
  //         .replace(".", "");
  //       product.year = +tags.at(-1);

  //       datas.push(product);
  //     });
  //     return datas;
  //   });
  //   await browser.close();
  //   return res.status(200).json({ status: "ok", msg: "", data: el });
  // } else {
  res.status(200).json({ status: "ok", msg: "hello", data: [] });
  // }
  // } catch (err) {
  //   res.status(404).json({ status: "error", msg: err, data: [] });
  // }
};
