const service = require("./moviesService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const  is_showing = req.query.is_showing;

    console.log('data', is_showing );
    if(is_showing){
        const data = await service.isShowing();
        res.json({data: data});
    }
    const data = await service.list();
    res.json({data: data});
}

async function read(req,res,next){
    console.log('movieId', req.params.movieId)
    const movies = await service.list();
    const foundMovie = movies.find((movie)=> {
        return movie.movie_id === Number(req.params.movieId);
    })
    if(foundMovie){
        console.log('found', foundMovie)
        res.json({data: foundMovie})
    }

    next({status:404, message: "need a proper movieId"})

}
// async function isShowing(req,res){
//     const {isShowing} = req.body.data
//     console.log('data', isShowing);
//     const data = await service.isShowing(isShowing);
//     res.json({data: data})
// }
module.exports = {
    list: asyncErrorBoundary(list),
   read,
}