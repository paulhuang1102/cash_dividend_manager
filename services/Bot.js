const Bots = [];

class Bot {
  constructor() {
    Bots.push(this);
  }

  init() {
    // return new Promise((resolve, reject) => {
    //   console.log()
    // })
    console.log(`${this.tag} Bot init`);
    this.ready();
  }

  ready() {
    console.log(`${this.tag} Bot Ready`);
  }

  start() {
    return Promise.resolve(true);
  }


  static getBot(tag) {
    const condition = new RegExp(`^${tag}$`, 'i');
    const bot = Bots.find((b) => condition.test(b.tag));
    return Promise.resolve(bot);
  }
}

module.exports = Bot;