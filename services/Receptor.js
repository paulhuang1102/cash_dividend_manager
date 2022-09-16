const Bot = require("./Bot");
const express = require("express");
const router = express.Router();

class Receptor extends Bot {
  constructor() {
    super();
    this.tag = 'Receptor';
    this.router = router;
  }

  start() {
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(express.json());
    this.registerAll()
    
    app.use('/api', this.router);
    
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });

  }

  registerAll() {
    this.register({
      apiOptions: {
        pathname: '/test',
        method: 'get'
      },
      operation: (req, res) => {
        console.log('ffff')
        res.send({
          success: true
        })
      }
    })
  }

  register({
    apiOptions,
    operation
  }) {
    this.router[apiOptions.method](apiOptions.pathname, async (req, res) => {
      operation(req, res)
    })

  }
}

module.exports = Receptor;
