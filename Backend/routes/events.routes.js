const { Router } = require("express");
const {
  getEvents,
  registerEvents,
  paymentVerification,
} = require("../controllers/event.controllers.js");

const router = Router();

router.route("/get/events").get(getEvents);
router.route("/register/:event_id").post(registerEvents);
router.route("/payment/verify").post(paymentVerification);

module.exports = router;
