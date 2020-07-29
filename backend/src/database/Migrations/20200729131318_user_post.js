exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table){
      table.increments();
  
      table.string('post').notNullable();

  
      table.string('user_id').notNullable();
  
      table.foreign('user_id').references('id').inTable('user');
    });
  };
  
  exports.down = function(knex) {
    return  knex.schema.dropTable('posts');
  };