const service = require("./moviesService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req,res){
    const  is_showing = req.query.is_showing;

    if(is_showing){
        const data = await service.isShowing();
        res.json({data: data});
    }
    const data = await service.list();
    res.json({data: data});

}

async function read(req,res,next){
    //check if movie with id exists

    const movies = await service.list();
    const foundMovie = movies.find((movie)=> {
        return movie.movie_id === Number(req.params.movieId);
    })
    if(foundMovie){

        res.json({data: foundMovie})
    }

    next({status:404, message: "need a proper movieId"})

}

async function readTheatersWithMovieId(req, res, next) {
    //check if movie with id exists
    const movieId = req.params.movieId
    const movies = await service.list();
    const foundMovie = movies.find((movie)=> {
        return movie.movie_id === Number(req.params.movieId);
    })

    if(foundMovie){
        const theaters = await service.readTheatersWithMovieId(movieId)
        res.json({data: theaters})
    }
    next({status: 404, message: "need a proper movieId"})
}

async function readReviewsWithMovieId(req,res,next){
    const movieId = req.params.movieId
    const movies = await service.list();
    const foundMovie = movies.find((movie)=> {
        return movie.movie_id === Number(req.params.movieId);
    })

    if(foundMovie){
        const critics = await service.listCritics();
        const foundCritic = critics.find((critic)=>{
            return critic.movie_id === movieId
        });

        const reviews = await service.readReviewsWithMovieId(movieId)

        res.json({data: reviews})
    }
    next({status: 404, message: "need a proper movieId"})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
    readTheatersWithMovieId,
    readReviewsWithMovieId,

}