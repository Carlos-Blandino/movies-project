const knex = require("../db/connection");

function list(){
    return knex("reviews").select("*");

}
function update(reviewId){

}

function destroy(reviewId){
return knex("reviews")
    .where({"review_id": reviewId}).del()

}

module.exports = {
    list,
    destroy,
    update,
}

