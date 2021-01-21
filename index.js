// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const server = require('express')()
// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  template: `<div>Hello World我是{{myName}}年龄{{myage}} 测试d {{d}} 测试e {{e}}</div>`,
  data: {
    myName: 'wzq',
    myage: 18,
    d: 0,
    e: 1
  }
})

server.get('*', (req, res) => {
  console.log(req.url);

  if (req.url === '/111') {
    app.d = 123
  }
  if (req.url === '/222') {
    app.e = 456
  }

  // 第 3 步：将 Vue 实例渲染为 HTML
  renderer.renderToString(app, (err, html) => {
    if (err) throw err
    res.writeHead(200, {
      "Content-Type": 'text/html;charset=utf-8'
    })
    // console.log(html)
    // => <div data-server-rendered="true">Hello World</div>
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)