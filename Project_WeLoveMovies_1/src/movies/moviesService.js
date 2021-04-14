const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");

}

// This function works on the qualified test
// function isShowing(){
//     return knex("movies")
//         .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
//         .select("*").groupBy("title")
//         .where({is_showing: true})
// }
function isShowing() {
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("*")
        .where({is_showing: true}).distinctOn("title");
}

function read(id) {
    return knex("movies")
        .select("*")
        .where({movie_id: id})
}

function readTheatersWithMovieId(movieId) {
    return knex('theaters')
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .select('*')

}

// this version of the function is working on qualified
// they are using sql lite 3 , it does not work on my postgresql setup
// function readTheatersWithMovieId(movieId){
//     return knex.select('*').from('theaters')
//         .join("movies", "movies.movie_id", "movies_theaters.movie_id")
//         .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
//         .where("movies_theaters.movie_id", movieId)
//
// }

module.exports = {
    list,
    isShowing,
    read,
    readTheatersWithMovieId
}