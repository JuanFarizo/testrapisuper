exports.up = function (knex) {
  return knex.schema.createTable('user', (t) => {
    t.increments();

    t.string('username').unique().notNullable();
    t.string('email').unique().notNullable();
    t.string('password').notNullable();

    // t.string('firstName').notNullable();
    // t.string('lastName').notNullable();
    // t.date('birthDate').notNullable();
    // t.enum('gender', ['Male', 'Female', 'Other']).nullable();

    t.string('role').notNullable().defaultTo('user');

    t.bool('isActive').defaultTo(true);
    t.timestamp('passwordChangedAt').nullable();
    t.string('passwordResetToken').nullable();
    t.timestamp('passwordResetExpires').nullable();

    t.timestamps(true, true) // Crea createdAt updatedAt automaticamente
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};