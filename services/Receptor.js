const Bot = require("./Bot");
const express = require("express");
const router = express.Router();
const Tool = require("../Tool");
class Receptor extends Bot {
  constructor({ config }) {
    super();
    this.tag = "Receptor";
    this.router = router;
    this.config = config;
  }

  start() {
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(express.json());
    this.registerAll();

    app.use("/api", this.router);

    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  }

  registerAll() {
    console.log(this.config.api.pathname);

    this.config.api.pathname.forEach((pathname) => {
      const args = pathname.split("|").map((v) => v.trim());
      const method = args[0];
      const paths = args[1].split(",").map((v) => v.trim());
      const operationArgs = args[2].split(".");

      paths.forEach((p) => {
        if (operationArgs[0] === "Bot") {
          Bot.getBot(operationArgs[1]).then((bot) => {
            this.register({
              apiOptions: {
                pathname: p,
                method,
              },
              operation: bot[operationArgs[2]],
            });
          });
        }

        if (operationArgs[1] === "Tool") {
          this.register({
            apiOptions: {
              pathname: p,
              method,
            },
            operation: Tool[operationArgs[2]],
          });
        }
      });
    });
  }

  register({ apiOptions, operation }) {
    this.router[apiOptions.method](apiOptions.pathname, async (req, res) => {
      const inputs = {
        body: res.body,
        files: res.files,
        params: res.params,
        header: res.header,
        method: res.method,
        query: res.query,
        session: res.session,
        // requestID,
      };
      const result = await operation(inputs);
      res.send({
        success: true,
        data: result,
      });
    });
  }
}

module.exports = Receptor;
