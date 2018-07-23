const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const cors = require('@koa/cors');

const app = new Koa();
const PORT = 2333;

app.use(cors({
    'Access-Control-Allow-Origin': 'http://localhost:8080'
}));
app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;