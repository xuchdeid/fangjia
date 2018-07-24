const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const cors = require('@koa/cors');

const app = new Koa();
const PORT = 2333;

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(cors({
    'Access-Control-Allow-Origin': 'http://localhost:8080'
}));
app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;