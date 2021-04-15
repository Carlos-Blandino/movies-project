const knex = require("../db/connection");

function list(){
    return knex("reviews").select("*");
}

function read(id){
    return knex("reviews")
        .select("*")
        .where({review_id: id}).first();
}

async function getTheCritic(critic_id) {
    return knex("critics").where({ critic_id }).first();
}

async function addCritic(review) {
    const id = review.critic_id;
    review.critic = await getTheCritic(id);
    review.critic.created_at = timestamp.toString();
    review.critic.updated_at = timestamp.toString();
    return review;
}

function update(review){
    const id = review.review_id;
    return knex("reviews")
        .where({review_id: id})
        .update(review, "*")
        .then(()=> read(id))
        .then(addCritic)
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

