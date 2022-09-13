const cheerio = require("cheerio");
const axios = require("axios");

class Crawler {
  constructor(url) {
    this.url = url;
  }

  fetch() {
    // Impliment
  }

  async request(url, retry = 3) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res);
        })
        .catch(async (err) => {
          if (retry > 0) {
            await this.sleep(8000);

            console.log(`Retry request remaining:${retry}`);

            return this.request(url, retry - 1);
          } else {
            console.error(err);
          }
        });
    });
  }

  sleep(milisec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(milisec);
      }, milisec);
    });
  }
}

class GoodinfoDividendCrawler extends Crawler {
  fetch() {
    const result = [];
    return new Promise((resolve, reject) => {
      this.request(this.url)
        .then((res) => {
          try {
            const $ = cheerio.load(res.data);
            const list = $("#tblDetail > tbody > tr").not(".bg_h2").toArray();

            list.forEach((v) => {
              const node = $(v);
              if (node.attr("style") !== "display:none;") {
                const id = node.find("td:nth-child(2) > nobr > a").html();
                const price = node.find("td:nth-child(16)").html();

                result.push({
                  id,
                  price: parseFloat(price),
                });
              }
            });
            resolve(result);
          } catch (err) {
            reject(err);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(false);
        });
    });
  }
}

module.exports = GoodinfoDividendCrawler;
