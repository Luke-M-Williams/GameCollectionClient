const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // Main entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
    filename: 'bundle.js' // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Regex to handle js and jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Resolve these extensions
  },
  devServer: {
    static: path.join(__dirname, 'public'), // Serve content from 'public' directory
    port: 8080 // Port number for the webpack dev server
  }
};