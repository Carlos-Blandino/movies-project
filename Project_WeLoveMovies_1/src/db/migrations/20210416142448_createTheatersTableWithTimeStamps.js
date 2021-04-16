
exports.up = function(knex) {
    return knex.schema.table("theaters", (table)=>{
        table.timestamp(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.table("theaters", (table)=>{
        table.dropTimestamps();
    })
};
