const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

/**
 *
 * @param {import("webpack").Configuration} config
 * @param {*} env
 * @returns {import("webpack").Configuration}
 */
module.exports = function override(config, _env) {
  config.plugins.push(new ModuleFederationPlugin(require("./modulefederation.config.js")));

  return config;
};
