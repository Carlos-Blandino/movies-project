const service = require("./reviewsService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const timestamp =  Date.now()

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

            "content": content,
            "review_id":reviewId,
            "score": score,
            "critic_id": foundReview.critic_id,
        }

        const result = await service.update(newReview)
        const stampedResult =
            {
                ...result,
                created_at: timestamp.toString(),
                updated_at: timestamp.toString()
            }

        res.json({data: stampedResult})
    } else {
        next({status: 404, message: "Review cannot be found."});
    }
}

async function destroy(req,res,next){
    //337 and 9999 are passed in as reviewId
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