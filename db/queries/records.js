const knex = require('../connection');

function getAll() {
    return knex('record').select('*');
}

function get(id) {
    return knex('record')
        .select('*')
        .where({ id: parseInt(id) });
}

function find(where, select) {
    return knex('record')
        .select(select)
        .where(where);
}

function add(record) {
    return knex('record')
        .insert(record)
        .returning('*');
}

function update(id, record) {
    return knex('record')
        .update(record)
        .where({ id: parseInt(id) })
        .returning('*');
}

function del(id) {
    return knex('record')
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
