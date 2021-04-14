const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");

}
// This function works on the qualified test
// function isShowing(){
//     return knex("movies")
//         .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
//         .select("*").groupBy("title")
//         .where({is_showing: true})
// }
function isShowing(){
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("*")
        .where({is_showing: true}).distinctOn("title");
}

function read(id){
    return knex("movies")
        .select("*")
        .where({movie_id: id})
}


module.exports = {
    list,
    isShowing,
  read,
}