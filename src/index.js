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

const paintSth = (n) => {
    if (typeof n != 'number') return false;
    const num = parseInt(n) % 2 === 0 ? n + 1 : n;
    const middle = parseInt(num / 2);
    let prevStone = middle;
    let nextStone = middle;
    let str = '\n';
    for (let i = 0; i < num; i++) {
        for(j = 0; j < num; j++) {
            if (j < prevStone || j > nextStone) {
                str += ' ';
            } else {
                str += '*'
            }
        }
        str += '\n'
        if (i < middle) {
            prevStone--;
            nextStone++; 
        } else {
            prevStone++;
            nextStone--;
        }
    }
    str += '\n'
    return str;
}

app.use(ctx => {
    ctx.body = `
    /*****************************************/
    hello, 
    /*****************************************/

    welcome to melody's world
    敬请期待我的华丽变身

    ${paintSth(13)}
    ${paintSth(17)}
    ${paintSth(21)}
    `
})
    .listen(PORT)
    .on('error', (err, ctx) => {
        log.error('server error', err, ctx)
    })