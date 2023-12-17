import { JSDOM } from "jsdom";

const getCarPage = async (req, res) => {
  const { brand, model, kmMin, kmMax } = await req.body;
  const url = "https://www.kleinanzeigen.de";

  const response = await fetch(
    `${url}/s-autos/${brand}/neue-anzeigen/c216+autos.km_i:${kmMin}%2C${kmMax}+autos.marke_s:${brand}+autos.model_s:${model}`
  );
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const ul = document.querySelectorAll(".aditem-main");
  let datas = [];
  Object.values(ul)?.map((item) => {
    let product = {};
    // eliminate ads
    if (
      item.parentElement.parentElement
        .getAttribute("class")
        .includes("is-topad")
    )
      return;
    const anchorElement = item.querySelector(".ellipsis");
    const itemUrl = anchorElement.getAttribute("href");
    product.id = itemUrl.split("/").at(-1);
    product.url = `https://www.kleinanzeigen.de${itemUrl}`;
    product.title = anchorElement.textContent;
    product.description = item
      .querySelector(".aditem-main--middle--description")
      .textContent;
    product.location = item
      .querySelector(".aditem-main--top--left")
      .textContent.trim();
    product.date = item.querySelector(".aditem-main--top--right")?.textContent;
    product.price = item
      .querySelector(".aditem-main--middle--price-shipping--price")
      .textContent?.replace("VB", "")
      .replace("€", "")
      .replace(" ", "")
      .replace(" ", "")
      .replace(".", "");
    let tags = item.querySelector(".text-module-end").textContent.split("\n");
    product.km = +tags
      .find((tag) => tag.includes("km"))
      .replace(" km", "")
      .replace(".", "");
    product.year = +tags.at(-2);
    datas.push(product);
  });
  return res.status(200).json({ status: "ok", msg: "", data: datas });
};

export default getCarPage;
