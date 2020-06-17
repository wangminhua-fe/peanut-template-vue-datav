const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'));
    const imagesRule = config.module.rule('images');
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 8192 }));
  },

  assetsDir: 'assets',
  publicPath: './',

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changOrigin: true,
        bypass: (req, res) => {
          if (req.headers.accept.indexOf('html') > -1) {
            return '/index.html';
          } else {
            const name = req.path.replace('.api', '');
            const mock = require(`./static/mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./static/mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};

module.exports = vueConfig;
