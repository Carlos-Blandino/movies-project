
exports.up = function(knex) {
 return knex.schema.table("critics", (table)=> {
     table.timestamp(true,true);
 })
};

exports.down = function(knex) {
  return knex.schema.table("critics", (table)=> {
      table.dropTimestamps();
  })
};
