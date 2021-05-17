const path = require('path');
var webpack = require('webpack');

var config = {
    mode:"development",
    context: path.resolve(__dirname, "app"),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "bundle.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        ON_TEST: process.env.NODE_ENV === 'test'
      })
    ],
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          { test: /\.html$/, loader: "html-loader" },
          { test: /\.css$/, use: ["style-loader","css-loader"] },
          { test: /\.less$/, use: ["style-loader","css-loader", "less-loader"] }
        ]
      }
}

if (process.env.NODE_ENV === 'production'){
  config.output.path = path.resolve(__dirname, "dist")
}

module.exports = config