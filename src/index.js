const Koa = require('koa')
const PORT = process.env.PORT || 5000;
const app = new Koa()

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Respence-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Respence-Time', `${ms}ms`)
})

app.use(ctx => {
    ctx.body = `
    /*****************************************/
    hello, 
    /*****************************************/
    welcome to melody's world
    you can see me ~~
    `
})
    .listen(PORT)
    .on('error', (err, ctx) => {
        log.error('server error', err, ctx)
    })