class Bot {
  constructor(tag) {
    this.tag = tag;
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
}

module.exports = Bot;