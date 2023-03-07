const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const { createProxyMiddleware } = require('http-proxy-middleware')
const k2c = require('koa2-connect')

const app = new Koa()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(` Your application is running here: http://localhost:${port}`)
})
app.use(koaMount('/', koaStatic(path.resolve('../dist'))))

app.use(async (ctx, next) => {
  const url = ctx.path
  ctx.respond = false
  await k2c(
    createProxyMiddleware({
      target: 'http://10.206.67.24',
      changeOrigin: true,
      secure: false
    })
  )(ctx, next)

  return await next()
})
