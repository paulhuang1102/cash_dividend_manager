const Crawler = require("./crawler");
const DB = require("./services/DBOperator");
const UserBot = require("./services/UserBot");
const Receptor = require('./services/Receptor');
const Config = require('./config');

const c = new Crawler(
  "https://goodinfo.tw/tw/StockDividendScheduleList.asp?MARKET_CAT=%E5%85%A8%E9%83%A8&INDUSTRY_CAT=%E5%85%A8%E9%83%A8&YEAR=%E5%8D%B3%E5%B0%87%E7%99%BC%E6%94%BE%E8%82%A1%E5%88%A9"
);
const db = new DB({
  username: "user",
  password: "core",
  port: 5432,
});

// c.fetch().then((data) => {
//   console.log(data);
// }).catch(err => {

// })
const userBot = new UserBot(db);
const receptor = new Receptor();

async function initial() {
  const config = await Config.readConfig('./config.toml');
  console.log(config)
  // await userBot.init();
  // await receptor.init();

  // receptor.start();
}
// db.connect();

initial();