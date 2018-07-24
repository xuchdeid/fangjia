const Router = require('koa-router');
const queries = require('../../../../db/queries/result');
const router = new Router();
const BASE_URL = `/api/v1/list`;
const SUPPORT_CITIES = ['sh', 'nj', 'bj', 'cd', 'cq', 'sz', 'hz', 'tj', 'wh', 'xa', 'cs', 'gz', 'qd', 'xm', 'sy', 'sz', 'zz'];

router.get(BASE_URL, async ctx => {
    try {
        ctx.body = {
            status: 'success',
            data: []
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${BASE_URL}/:id`, async ctx => {
    try {
        const city = ctx.params.id;
        console.log(ctx.query);
        if (!city || SUPPORT_CITIES.indexOf(city) < 0) {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'not support!'
            };
        } else {
            const results = await queries.getAll(city, ctx.query);
            results.map(item => {
                item.info = item.desc.split('/');
            });
            ctx.body = {
                status: 'success',
                data: results
            };
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

module.exports = router;