
exports.up = function(knex) {
 return knex.schema.table("reviews", (table)=>{
     table.timestamp(true,true);
 })
};

exports.down = function(knex) {
  return knex.schema.table("reviews", (table)=>{
      table.dropTimestamps();
  })
};
