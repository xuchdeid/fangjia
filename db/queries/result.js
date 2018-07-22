const knex = require('../connection');

//select sell.id as sell_id, sell.desc, total, last, 100*(last - total)/last as down from sell left join record on sell.id = record.sell_id where city = 'sh';

function getAll(city) {
    return knex('sell')
        .select('sell.id as sell_id', 'sell.desc', 'total', 'last')
        .leftJoin('record', 'sell.id', 'record.sell_id')
        .where({ city: city });
}

module.exports = {
    getAll
};
