const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./source/js/main.js`,
  output: {
    filename: `bundle.js`,
  },
  devtool: `source-map`,
};
