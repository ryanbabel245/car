import { JSDOM } from "jsdom";

const getLastId = async (req, res) => {
  const url = "https://www.kleinanzeigen.de/s-anzeige";
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const ul = document.querySelector("#srp-results");
  const li =
    ul
      .querySelectorAll(".j-adlistitem")[3]
      .getAttribute("data-href")
      .split('/')
      .at(-1)
      .split("-")[0]
  
  return res.status(200).send({id:+li});
};
export default getLastId;
