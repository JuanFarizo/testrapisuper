exports.up = function (knex) {
    return knex.schema.alterTable('buyers', (t) => {
        t.integer('userID')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
    })
};


exports.down = function (knex) {
    return knex.schema.alterTable('buyers', (t) => {
        t.dropForeign('buyers_userid_foreign')
        t.dropColumn('userID')
    })
};