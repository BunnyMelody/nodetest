const Koa = require('koa')
const PORT = process.env.PORT || 5000;

const app = new Koa()

app.use(ctx => {
    ctx.body = `
    /**********************************************/
    hello, 
    /*********************************************/
    welcome to melody's world
    you can see
    `
})

app.listen(PORT)