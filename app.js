const fs = require('fs')

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

const WebSocket = require('ws')

const wsapp = new WebSocket.Server({ port: 3001 }, () => {
  console.log('websocket listening on port 3001')
})

wsapp.on('connection', ws => {
  ws.on('message', message => {
    console.log('message received.')
    ws.send('hello client.')
    const picture = fs.readFileSync(__dirname + '/screenshots/test.png')
    ws.send(Date.now())
    ws.send(picture)
    // setInterval(() => {
    //   ws.send('dong...')
    // }, 1400)
  })
})
