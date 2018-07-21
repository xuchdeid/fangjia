exports.up = (knex, Promise) => {
    const createSell = knex.schema.createTable('sell', table => {
        table.increments('id').primary();
        table.string('url').notNullable();
        table.string('title').notNullable();
        table.string('desc').notNullable();
        table.string('city').notNullable();
        table.timestamps();

        table.unique('url');
    });

    const createRecord = knex.schema.createTable('record', table => {
        table.increments('id').primary();
        table.float('total').notNullable();
        table.float('last').notNullable();
        table.string('date').notNullable();
        table
            .integer('sell_id')
            .unsigned()
            .references('sell.id');
        table.timestamps();
    });

    return Promise.all([createSell, createRecord]);
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('record').then(() => {
        return knex.schema.dropTable('sell');
    });
};
