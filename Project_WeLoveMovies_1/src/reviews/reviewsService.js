const knex = require("../db/connection");


function list(movieId){
    return knex('reviews')
        .join("movies", "movies.movie_id", "reviews.movie_id")
        .join("critics", "critics.critic_id", "reviews.critic_id")
        .select("reviews.*")
        .where("reviews.movie_id", movieId)
        .then(reviews => {
           return Promise.all( reviews.map((review) => addCritics(review)));
        } );
}

async function addCritics(review){
    review.critic = await knex("critics")
        .where({"critics.critic_id": review.critic_id})
        .first();
    return review
}

function read(id){
    return knex("reviews")
        .select("*")
        .where({review_id: id}).first();
}


function update(review){
    const id = review.review_id;
    return knex("reviews")
        .where({review_id: id})
        .update(review, "*")
        .then(() => Promise.resolve(addCritics(review)));
}

function destroy(reviewId){
    return knex("reviews")
        .where({"review_id": reviewId}).del()
}


module.exports = {
    list,
    destroy,
    update,
    read
}

