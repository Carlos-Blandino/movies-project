const service = require("./reviewsService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const timestamp = Date.now();

async function list(req, res) {
    const data = await service.list(req.params.movieId);
    res.json({data: data});
}

async function update(req, res, next) {
    const newReview = req.body.data
    const resultReview = {
        ...res.locals.review,
        ...newReview,
    }
    const result = await service.update(resultReview)
    const stampedResult =
        {
            ...result,
            created_at: timestamp.toString(),
            updated_at: timestamp.toString()
        }
    res.json({data: stampedResult})
}

async function destroy(req, res, next) {
    const reviewId = res.locals.review.review_id;
    await service.destroy(reviewId);
    res.sendStatus(204);
}

async function doesReviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: `Review cannot be found.`});
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [
        asyncErrorBoundary(doesReviewExists),
        asyncErrorBoundary(update),
    ],
    destroy: [asyncErrorBoundary(doesReviewExists), asyncErrorBoundary(destroy)],
}

