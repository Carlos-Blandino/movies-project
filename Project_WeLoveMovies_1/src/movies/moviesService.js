const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {

    return knex("movies")
        .select("*")
}

function read(id){
    return knex("movies")
        .select("*")
        .where({movie_id: id})
}

function listCritics(){
    return knex("critics").select("*")
}

function isShowing(){
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("*")
        .where({"movies_theaters.is_showing": true})
        .groupBy("title")
}

function readTheatersWithMovieId(movieId){
    return knex.select('*').from('theaters')
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .where("movies_theaters.movie_id", movieId)
}

const addCritics = mapProperties({
    organization_name : "critic.organization_name",
    preferred_name : "critic.preferred_name",
    surname : "critic.surname",
})

function readReviewsWithMovieId(movieId){
    return knex.select('*').from('reviews')
        .join("movies", "movies.movie_id", "reviews.movie_id")
        .join("critics", "critics.critic_id", "reviews.critic_id")
        .where("reviews.movie_id", movieId).then(results => results.map(addCritics));
}

module.exports = {
    list,
    isShowing,
    read,
    readTheatersWithMovieId,
    readReviewsWithMovieId,
    listCritics
}