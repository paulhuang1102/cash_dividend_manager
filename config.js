const fs = require("fs");
const path = require("path");
const os = require("os");
const toml = require("toml");

class Config {
  static readFile(filePath, config = {}) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, config, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static readJson(filePath) {
    return this.readFile(filePath).then((data) => JSON.parse(data));
  }

  static readPackageinfo() {
    const filePath = path.resolve(__dirname, "./package.json");

    return this.readJson(filePath);
  }

  static fileExists(filePath) {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  static async readConfig(filePath) {
    console.log(filePath);
    let defaultCFG;
    let config;
    const packageInfo = await this.readPackageinfo();
    const basePath = path.resolve(os.homedir(), packageInfo.name);
    const fileExists = await this.fileExists(filePath);

    const defaultCFGP = path.resolve(__dirname, "./default.config.toml");
    const defaultCFGTOML = await this.readFile(defaultCFGP);

    try {
      defaultCFG = toml.parse(defaultCFGTOML);
    } catch (e) {
      console.log(e)

      return Promise.reject(new Error(`Invalid config file: ${defaultCFGP}`));
    }

    if (!fileExists) {
      config = defaultCFG;
    } else {
      const currentCFGP = filePath;
      const currentCFGTOML = await this.readFile({ filePath: currentCFGP });
      try {
        currentCFG = toml.parse(currentCFGTOML);
      } catch (e) {
        return Promise.reject(new Error(`Invalid config file: ${currentCFGP}`));
      }
      config = dvalue.default(currentCFG, defaultCFG);
    }
    config.packageInfo = packageInfo;
    config.runtime = {
      filePath,
      startTime: new Date().getTime(),
    };
    config.homeFolder = config.base.folder
      ? path.resolve(basePath, config.base.folder)
      : basePath;
    return Promise.resolve(config);
  }
}

module.exports = Config;
