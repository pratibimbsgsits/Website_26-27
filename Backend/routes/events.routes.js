const { Router } = require("express");
const {
  getEvents,
  registerEvents,
  paymentVerification,
} = require("../controllers/event.controllers.js");

const router = Router();

router.route("/api/get/events").get(getEvents);
router.route("/api/register").post(registerEvents);
router.route("/payment/verify").post(paymentVerification);

module.exports = router;
