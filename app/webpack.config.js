
module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: __dirname,
    filename: 'dist.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require('@babel/preset-env'), '@babel/preset-react'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      }
    ]
  }
}
