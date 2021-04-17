const service = require("./moviesService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const isShowing = req.query.is_showing;
    if (isShowing) {
        const trueMovieList = await service.isShowingList();
        res.json({data: trueMovieList});
    } else {
        const data = await service.list();
        res.json({data: data});
    }
}

async function read(req, res, next) {
    const movie = res.locals.movie;
    res.json({data: movie})
}

async function doesMovieExist(req, res, next) {
    //check if movie with id exists
    const movieId = req.params.movieId
    const movie = await service.read(movieId);

    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: "need a proper movieId"})
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(doesMovieExist), asyncErrorBoundary(read)],

}
