const service = require("./reviewsService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const data = await service.list();
    res.json({data: data});
}

async function update(req,res,next){
    const { reviewId } = req.params;

    const reviewList = await service.list();

    //need to check reviewId against the reviews list
    const foundReview = reviewList.find((item)=> item.review_id === Number(reviewId));

    if(foundReview){
        const { data: { content, score = foundReview.score } = {} } = req.body;
        //need body of request to insert as update

        const newReview = {
            "review_id":reviewId,
            "score": score,
            "content": content,
            "critic_id": foundReview.critic_id,
        }

        const result = await service.update(newReview)

        res.json({data: result})
    } else {
        next({status: 404, message: "Review cannot be found."});
    }
}

async function destroy(req,res,next){
    const { reviewId } = req.params;

    //reviewList is an array of objects
    const reviewList = await service.list()

    //need to check reviewId against the reviews list
    const found = reviewList.find((item)=> item.review_id === Number(reviewId))

    if(found){
        await service.destroy(reviewId);
        res.sendStatus(204);
    } else {
        next({status: 404, message: "Review cannot be found."});
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    destroy,
    update
}


