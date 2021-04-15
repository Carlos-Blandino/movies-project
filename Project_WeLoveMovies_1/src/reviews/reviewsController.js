const service = require("./reviewsService");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}
async function update(req,res,next){

}
async function destroy(req,res,next){
    const { reviewId } = req.params;
    const reviews = await service.list()
    const foundReview = reviews.find((review) => review.review_id === Number(reviewId));
   if(foundReview){
       const status = await service.destroy(reviewId);
       res.sendStatus(204);
   } else {
       next({status: 404, message: "'Review cannot be found."});
   }

}

module.exports = {
    list: asyncErrorBoundary(list),
    update,
    destroy,
}


