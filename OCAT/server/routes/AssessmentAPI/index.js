const router = require(`express`).Router();
const { AssessmentService } = require(`../../libs`);
const { ErrorHandler } = require(`../../utils`);

router.post(`/submit`, (req, res) => {
    //call the AssessmentSubmit function from the server/libs/AssessmentService
    console.log('helkhjkjloriyuuuuu')
    console.log('req', req.body);
  //  console.log('res',res)
     AssessmentService.submit(req.body);
});

exports.router = router;
exports.path = `/api/assessment`;