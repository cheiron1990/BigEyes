const Koa = require('koa')
const Router = require('koa-router')
const isBot = require('koa-isbot')
const send = require('koa-send')

const app = new Koa()
const router = new Router()

app.use(isBot())

router.get('/', async ctx => {
  await send(ctx, '/index.html', {root: __dirname + '/public'})
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listening on port 3000')
})

const ws = require('koa-websocket')

const wsapp = ws(new Koa())

wsapp.ws.use(ctx => {
  ctx.websocket.on('message', message => {
    console.log('message received.')
    ctx.websocket.send('hello client')
    setInterval(() => {
      ctx.websocket.send('dong...')
    }, 1400)
  })
})

wsapp.listen(3001, () => {
  console.log('websocket listen on port 3001')
})
