
module.exports = {
  entry: `${__dirname}/src/${index.js}`,
  output: `${__dirname}/dist.js`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules),
        use: {
          loader: 'babel-loader',
          options: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [require('@babel/plugin-proposal-object-rest-spread')]
            }
          }
        }
      }
    ]
  }
}
