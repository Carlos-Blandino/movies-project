const knex = require("../db/connection");

function list() {
    return knex("theaters")
        .then((theaters) => {
            return Promise.all(theaters.map(setMovies));
        });
}

async function setMovies(theater) {
    theater.movies = await knex("movies")
        .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
        .where({ "movies_theaters.theater_id": theater.theater_id });
    return theater;
}

module.exports = {
    list,
}