const path = require('path');

module.exports = {
    mode:"development",
    context: path.resolve(__dirname, "app"),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          { test: /\.html$/, loader: "html-loader" }
        ]
      }
}