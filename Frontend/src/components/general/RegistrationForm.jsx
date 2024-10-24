import React, { useState } from "react";
import { useSelector } from "react-redux";

const RegistrationForm = ({event_id}) => {

    const [formData, setFormData] = useState({});
    const {currentUser} = useSelector((state)=>state.user)

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
        
      };

      const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(formData);
       // console.log(event_id);
        
        const res = await fetch(`/api/register?event_id=${event_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ team_name:formData.teamName, team_members:formData.teamMembers,name:formData.name,email: currentUser.email,phone:formData.phone }),
          });
        
          const data = await res.json();
          console.log(data);
          
      }



  return (
    <div className="min-h-screen flex items-center justify-center z-50">
      <div className="bg-violet-500 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4"> Please fill in your details to continue</h2>

        <form onSubmit={handleSubmit} >
          {/* Name */}
          <div className=" gap-4 mb-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2" htmlFor="firstName">
                Team Lead Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
            </div>
           
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="phone">
              Phone Number for Group joining
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          {/* Team Name */}
          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Team Name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Team Members */}
          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="teamMembers">
              Number of Team Members
            </label>
            <input
              type="number"
              id="teamMembers"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Number"
              onChange={handleChange}
              required
            />
          </div>

          {/* Go to Payment Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 uppercase font-bold text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Go to Payment →
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
