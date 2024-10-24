const { Router } = require("express");
const { changeEnrollment } = require("../controllers/user.controllers.js");

const router = Router();

router.route("/change-enrollment").post(changeEnrollment);

module.exports = router;
