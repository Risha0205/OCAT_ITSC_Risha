const router = require(`express`).Router();
const { resolve } = require("app-root-path");
const { AssessmentService } = require(`../../libs`);
const { ErrorHandler } = require(`../../utils`);

router.post(`/submit`, (req, res) => {
    //call the AssessmentSubmit function from the server/libs/AssessmentService
    console.log('helkhjkjloriyuuuuu')
    console.log('req', req.body);
  //  console.log('res',res)
     AssessmentService.submit(req.body);
});

router.get(`/retrieve`, (req, res) => {
  console.log('retrieve==>',req)
  AssessmentService.retrieve().then((response) => {
    console.log('retData--->',response.body.data)
       res.send(response.body.data)        
    });
});

router.post(`/delete`, (req, res) => {
  console.log('delet--->',req.body)
  AssessmentService.delete(req.body).then((response) => {
    res.send(response.body)        
  });;

});

exports.router = router;
exports.path = `/api/assessment`;



