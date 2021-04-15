const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addMovies = mapProperties({
    movie_id: "movies.movie_id",
    title: "movies.title",
    runtime_in_minutes: "movies.runtime_in_minutes",
    rating: "movies.rating",
    description: "movies.description",
    image_url: "movies.image_url",
})
function list(){
   // return knex("theaters").select("*");
    return knex("theaters")
        .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .join("movies" , "movies.movie_id" , "movies_theaters.movie_id")
        .select("*").then(results => results.map( addMovies))
}

module.exports = {
    list,
}