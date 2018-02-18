process.env.NODE_ENV = "development";

const webpack = require('webpack');
const config = require('../config/webpack.config.dev');

const compiler = webpack(config, () => {
  console.log("Development build complete.");
});

const watching = compiler.watch({
  aggregateTimeout: 500,
  poll: 1200,
  ignored: /node_modules/
}, (err, stats) => {
  if(err) return console.error(err);

  // console.log(stats);
  console.log("Server is updated.");
});



