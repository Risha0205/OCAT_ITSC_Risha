const router = require(`express`).Router();
const { AssessmentService } = require(`../../libs`);
const { ErrorHandler } = require(`../../utils`);
import { submit } from '../../../server/libs/AssessmentService';

router.post(`/submit`, (req, res) => {
    //call the AssessmentSubmit function from the server/libs/AssessmentService
    await AssessmentService.submit(data);
});

exports.router = router;
exports.path = `/api/assessment`;