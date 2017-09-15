## 使用

```bash

  yarn

  npm run dev

```

## 介绍

基于`vue-markdown-loader`+`vue-cli`实现md转vue文档工具

为了快速实现DEMO，故UI界面使用Element-UI。

本项目可用于后期组件库的文档搭建，经典DEOM学习共享。


## 配置
配置，`webpack.base.conf.js`

```js
  {
    test: /\.md$/,
    loader: 'vue-markdown-loader',
    options: {
      preventExtract: true,// 防止代码片段里的script及style与组件配置项冲突
      use: [
        [require('markdown-it-anchor'), {
          level: 2,
          slugify: slugify,
          permalink: true,
          permalinkBefore: true
        }],
        // markdown-it-container 实现自定义代码片段
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
      ],
      preprocess: function (MarkdownIt, source) {
        MarkdownIt.renderer.rules.table_open = function () {
          return '<table class="table">'
        }
        MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
        return source
      }
    }
  }
```
TODO

- 基于loader实现路由自动配置

- 优化vue-markdown-loader实现DEMO对应组件，减少代码

感谢[Element-ui](http://element.eleme.io/#/zh-CN)
