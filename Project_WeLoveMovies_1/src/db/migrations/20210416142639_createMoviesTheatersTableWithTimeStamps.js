
exports.up = function(knex) {
    return knex.schema.table("movies_theaters", (table)=>{
        table.timestamp(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.table("movies_theaters", (table)=>{
        table.dropTimestamps();
    })
};
