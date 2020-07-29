
exports.up = function(knex) {
    return knex.schema.createTable('user', function (table){
        table.string('id').primary();
        table.string('password').notNullable();
        table.string('user_type').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('localidade').notNullable();
        table.string('uf', 2).notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};