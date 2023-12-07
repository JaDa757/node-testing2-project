exports.up = function (knex) {
    return knex.schema.createTable('resources', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('quantity').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('resources');
  };
  