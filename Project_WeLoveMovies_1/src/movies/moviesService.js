const knex = require("../db/connection");


function list() {
    return knex("movies")
        .select("*")
}


function read(id){
    return knex("movies")
        .select("*")
        .where({movie_id: id}).first();
}

function isShowingList(){
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where({"movies_theaters.is_showing": true})
        .distinct("title")
}


module.exports = {
    list,
    isShowingList,
    read,
}


