"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          loader: "graphql-tag/loader",
          exclude: /node_modules/
        }
      ]
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
