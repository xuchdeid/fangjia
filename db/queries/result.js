const knex = require('../connection');

//select sell.id as sell_id, sell.desc, total, last, 100*(last - total)/last as down from sell left join record on sell.id = record.sell_id where city = 'sh';

function getAll(city, param = {}) {
    param.city = city;
    return knex('sell')
        .select('sell.id as sell_id', 'sell.desc', 'total', 'last', 'date')
        .leftJoin('record', 'sell.id', 'record.sell_id')
        .where(param);
}

module.exports = {
    getAll
};