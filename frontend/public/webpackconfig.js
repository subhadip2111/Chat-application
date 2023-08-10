// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   // Other webpack configuration options...

//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     compress: true,
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:5000',
//         secure: false,
//         changeOrigin: true,
//       },
//     },
//   },
//  resolve: {
//      fallback: {
//        "fs": false, // Exclude the 'fs' module
//      },
//    },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//   ],
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Change this to match your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Other webpack configuration options...

  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": require.resolve("browserify-fs"), // Or set "fs": false if you want to exclude 'fs' module
    },
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        secure: false,
        changeOrigin: true,
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};



























// const path = require('path');

// module.exports = {
//   // Other webpack configuration options...

//   resolve: {
//     fallback: {
//       "fs": false, // Exclude the 'fs' module
//     },
//   },

//   // More webpack configuration options...
// };
