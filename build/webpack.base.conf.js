var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var hljs = require('highlight.js')
var md = require('markdown-it')()
var striptags = require('./strip-tags')
var slugify = require('transliteration').slugify
function convert (str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preset: 'default',
          breaks: true,
          preventExtract: true,
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre><code class="hljs">' +
                       hljs.highlight(lang, str, true).value +
                       '</code></pre>'
              } catch (__) {}
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
          },
          use: [
            [require('markdown-it-anchor'), {
              level: 2,
              slugify: slugify,
              permalink: true,
              permalinkBefore: true
            }],
            [require('markdown-it-container'), 'demo', {
              validate: function (params) {
                return params.trim().match(/^demo\s*(.*)$/)
              },

              render: function (tokens, idx) {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

                if (tokens[idx].nesting === 1) {
                  var description = (m && m.length > 1) ? m[1] : ''
                  var content = tokens[idx + 1].content
                  var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                  var script = striptags.fetch(content, 'script')
                  var style = striptags.fetch(content, 'style')
                  var jsfiddle = { html: html, script: script, style: style }
                  var descriptionHTML = description ? md.render(description) : ''
                  jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))
                  return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                            <div class="source" slot="source">${html}</div>
                            ${descriptionHTML}
                            <div class="highlight" slot="highlight">`
                }
                return '</div></demo-block>\n'
              }
            }],
            [require('markdown-it-container'), 'tip']
          ]
        }
      }
    ]
  }
}
