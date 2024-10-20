const { Router } = require("express");
const {getEvents,registerEvents} = require("../controllers/event.controllers.js");

const router = Router();

router.route("/get/events").get(getEvents);
router.route("/register/:event_id").post(registerEvents);


module.exports = router;
