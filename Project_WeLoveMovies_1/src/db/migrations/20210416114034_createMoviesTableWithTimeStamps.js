
exports.up = function(knex) {
    return knex.schema.table("movies", (table)=>{
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.table("movies", (table)=>{
 table.dropTimestamps();
    })
};
