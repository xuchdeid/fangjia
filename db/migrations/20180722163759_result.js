exports.up = function(knex, Promise) {
    const createResult = knex.schema.createTable('result', table => {
        table.increments('id').primary();
        table
            .integer('sell_id')
            .unsigned()
            .references('sell.id');
        table.float('total').notNullable();
        table.float('last').notNullable();
        table.float('down').notNullable();
        table.timestamps();
    });

    return Promise.all([createResult]);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('result');
};
