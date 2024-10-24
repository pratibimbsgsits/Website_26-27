import React, { useState } from "react";
import axios from "axios";

const EventBooking = () => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/register-events/1`, {
        team_name: teamName,
        team_members: teamMembers,
        name,
        email,
        phone,
      });

      const { data } = response.data.response;

      // Redirect to Razorpay payment page
      handlePayment(data.order_id, data.amount);
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Error during booking. Please try again.");
    }
  };

  // Razorpay payment function
  const handlePayment = (order_id, amount) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: amount, // in paise
      currency: "INR",
      order_id: order_id, // from backend
      name: "Event Booking",
      description: "Payment for event booking",
      handler: function (response) {
        verifyPayment(response);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Payment verification
  const verifyPayment = async (response) => {
    try {
      const verificationResponse = await axios.post(
        "http://localhost:5000/verify-payment",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      );

      if (verificationResponse.status === 200) {
        alert("Payment successful and verified!");
      } else {
        alert("Payment verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("Error verifying payment. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Book Event</h1>
      <form onSubmit={handleBooking}>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Team Members:</label>
          <input
            type="text"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Event & Pay</button>
      </form>
    </div>
  );
};

export default EventBooking;
