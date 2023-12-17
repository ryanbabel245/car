import { JSDOM } from "jsdom";

const getLastId = async (req, res) => {
  const url = "https://www.kleinanzeigen.de/s-anzeige";
  let { id } = req.body;
  // let lastId;
  // let epmtyResponse = 10;
  // const datas = [];
  const response = await fetch(`${url}/${id}`);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const div = document.querySelector("#vap-brdcrmb");
  if (!div) {
    return res.status(201).send({ lastId: 0, data: {} });
  } else if (
    div
      ?.querySelectorAll(".breadcrump-link")[2]
      .getAttribute("href")
      .includes("c216")
  ) {
    let data = { id };
    data.url = `${url}/${id}`;
    data.title = document.querySelector("#viewad-title").textContent.trim();
    data.price = +document
      .querySelector(".boxedarticle--price")
      .textContent.replaceAll("\n", "")
      .replace("VB", "")
      .replace("€", "")
      .replaceAll(".", "")
      .trim();

    const listDetails = document.querySelectorAll(".addetailslist--detail");
    data.km = +listDetails[2]
      .querySelector(".addetailslist--detail--value")
      .textContent.replace(".", "")
      .replace("km", "")
      .trim();

    data.year = +listDetails[4]
      ?.querySelector(".addetailslist--detail--value")
      .textContent.trim()
      .split(" ")[1];
    return res.status(200).send({ lastId: id, data });
  } else {
    return res.status(200).send({ lastId: id, data: {} });
  }
};
export default getLastId;
