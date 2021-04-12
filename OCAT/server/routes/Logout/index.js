const router = require(`express`).Router();
const { LogoutRoute } = require(`../../utils`);

router.get(`/`, LogoutRoute);

exports.router = router;
exports.path = `/api/logout`;