const knex = require('../connection');

function getAll() {
    return knex('sell').select('*');
}

function get(id) {
    return knex('sell')
        .select('*')
        .where({ id: parseInt(id) });
}

function find(where, select) {
    return knex('sell')
        .select(select)
        .where(where);
}

function add(sell) {
    return knex('sell')
        .insert(sell)
        .returning('*');
}

function update(id, sell) {
    return knex('sell')
        .update(sell)
        .where({ id: parseInt(id) })
        .returning('*');
}

function del(id) {
    return knex('sell')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAll,
    get,
    find,
    add,
    update,
    del
};
