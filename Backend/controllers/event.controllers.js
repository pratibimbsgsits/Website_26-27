const QRCode = require("qrcode");
const db = require("../db/index.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { errorHandler } = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getEvents = async (req, res) => {
  try {
    const { status } = req.query;

    let query = db("events").select("*");

    if (status) {
      query = query.where("status", status);
    }

    const events = await query;

    if (events.length === 0) {
      return res
        .status(404)
        .send(
          errorHandler(
            404,
            "Not Found",
            "No events found with the specified status"
          )
        );
    } else {
      return res.status(200).send({
        response: {
          data: events,
          title: "Events Fetched",
          message: "Events fetched successfully",
          status: 200,
        },
      });
    }
  } catch (error) {
    console.log("Error in fetching events", "---------------->", error);
    return res
      .status(500)
      .json(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in fetching events. Please try again later."
        )
      );
  }
};

const registerEvents = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { team_name, team_members, name, email, phone } = req.body;

    if (!event_id) {
      return res
        .status(400)
        .send(errorHandler(400, "Not Found", "Mentioned Event not found"));
    }

    const eventExists = await db("events").where({ event_id }).first();
    if (!eventExists) {
      return res
        .status(404)
        .send(
          errorHandler(404, "Not Found", "Event not found in the database")
        );
    }

    if (!team_name || !team_members || !name || !email || !phone) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please fill all required fields"
          )
        );
    }
    const qrCodeData = `Event Ticket for ${name}\nEvent ID: ${event_id}\nTeam: ${team_name}\nMembers: ${team_members}`;
    await QRCode.toFile("./qr_code.png", qrCodeData);

    const price = 500 * 100;

    const options = {
      amount: price,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    console.log(order, "-------------------->");
    if (!order) {
      return res
        .status(500)
        .send(
          errorHandler(500, "Order Error", "Failed to create Razorpay order")
        );
    }

    let data = {
      event_id,
      team_name,
      team_members,
      attendee_name: name,
      attendee_phone: phone,
      attendee_email: email,
      order_id: order.id,
      payment_status: "PENDING",
    };

    let insertion = await db("attendees").insert(data).returning("*");

    if (!insertion) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Error Occurred", "Error while making booking")
        );
    }
    await sendEmail(email, name, "./qr_code.png");

    return res.status(200).send({
      response: {
        data: { insertion },
        title: "Booking Successful",
        message: "Booking Successful for the event",
      },
    });
  } catch (error) {
    console.error("Error while making booking:", error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in booking the ticket"
        )
      );
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const secret = "5fDFjPzybzKSNMvFGByuGbmN";
    const hash = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log(hash);

    if (hash === razorpay_signature) {
      await db("attendees")
        .where({ order_id: razorpay_order_id })
        .update({ payment_status: "APPROVED" });

      res.status(200).json({
        message: "Payment verified successfully",
        razorpay_payment_id,
        razorpay_order_id,
      });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getEvents,
  registerEvents,
  paymentVerification,
};
