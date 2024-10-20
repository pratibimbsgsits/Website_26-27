const express = require("express");
const QRCode = require("qrcode");
const db = require("../db/index.js");
const { errorHandler } = require("../utils/errorHandler");
const { response } = require("express");

const getEvents = async (req, res) => {
  try {
    const { status } = req.body;
    console.log("Fetching events with status:", status); // Log the incoming status
    const events = await db("events").select("*").where("status", status);
    console.log("Fetched events:", events); // Log the fetched events

    if (!events) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Not Found",
            "Events with specified status not found"
          )
        );
    } else {
      return res.status(200).send({
        response: {
          data: events,
          title: "Events Fetched",
          message: "Events Fetched with specified status",
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

    // Check if the event exists
    const eventExists = await db("events").where({ event_id }).first();
    if (!eventExists) {
      return res
        .status(404)
        .send(
          errorHandler(404, "Not Found", "Event not found in the database")
        );
    }

    if (!team_name) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Invalid Request", "Please enter the team name")
        );
    }

    if (!team_members) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please enter the number of members attending the event"
          )
        );
    }

    if (!name || !email || !phone) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Invalid Request",
            "Please enter valid Name, Email, and Phone Number to get tickets"
          )
        );
    }

    const qrCodeData = await QRCode.toDataURL(`Event Ticket for ${name}`);
    console.log(qrCodeData);

    let data = {
      event_id,
      team_name,
      team_members,
      attendee_name: name,
      attendee_phone: phone,
      attendee_email: email
    };

    let insertion = await db("attendees").insert(data).returning("*");
    if (!insertion) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Some Error Occurred",
            "Error Occurred while making booking"
          )
        );
    } else {
      return res.status(200).send({
        response: {
          data: { insertion, qrCodeData },
          title: "Booking Successful",
          message: "Booking Successful for the event",
        },
      });
    }
  } catch (error) {
    console.error("Error while making booking", "-------------------->", error);
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

module.exports = {
  getEvents,
  registerEvents,
};
