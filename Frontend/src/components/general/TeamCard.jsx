import React from "react";
import { Meteors } from "../accertinityui/Meteor";
import  InstagramIcon  from '@mui/icons-material/Instagram';
import  FacebookIcon  from '@mui/icons-material/Facebook';
import  LinkedInIcon  from '@mui/icons-material/LinkedIn';


export function TeamCard({name,post}) {
  return (
    <div>
    <div className="w-60 relative ">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 py-3  h-full overflow-hidden rounded-2xl flex flex-col justify-end items-center">
        
        {/* Image above the name */}
        <img
          src="ItsMe.jpg"
          alt="Your Name"
          className="z-10 h-40 w-40 rounded-full object-cover border-2 border-gray-500 mb-4"
        />
        
        <h1 className="font-bold text-xl text-white relative z-50">
          {name}
        </h1>
  
        <p className="font-normal text-base text-slate-500  relative z-50">
          {post}
        </p>
        <Meteors number={20} />
      </div>
    </div>
  </div>
  
  );
}
