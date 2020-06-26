exports.up = function (knex) {
  return knex.schema.createTable('address', (t) => {
    t.increments();
    t.string('address').notNullable();
    t.string('city').notNullable();
    t.integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('address');
};