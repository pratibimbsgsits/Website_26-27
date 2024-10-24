import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-800 py-10 px-6 mt-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Section: Logo and Address */}
        <div className="space-y-4">
          <img src="/PratibimbLogo2.png" alt="Pratibimb Logo" className="w-40" />
          <p className="text-lg font-semibold">Locate us</p>
          <p className="flex items-center space-x-2">
            <LocationOnIcon />
            <span className='text-sm' >SGSITS 23, M.Visvesvaraya Marg, Indore, Madhya Pradesh, 452003</span>
          </p>
          <p className="flex items-center space-x-2">
            <EmailIcon />
            <span className='text-sm' >clubpratibimb.sgsits@gmail.com</span>
          </p>
          {/* Social Icons */}
          
        </div>

        {/* Middle Section: Discover */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Discover</h3>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon className="text-black text-2xl" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FacebookIcon className="text-black text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <LinkedInIcon className="text-black text-2xl" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Past Events</h3>
          <ul className="space-y-2">
            <li><a href="/workshop" className="hover:underline">Sepia</a></li>
            <li><a href="/vista" className="hover:underline">Streetscape</a></li>
            <li><a href="/scribble-story" className="hover:underline">Scribble Story</a></li>
          </ul>
        </div>

        {/* Right Section: For You */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">For you</h3>
          <ul className="space-y-2">
            <li><a href="/certificate" className="hover:underline">Certificate</a></li>
            <li><a href="/sponsorship" className="hover:underline">Sponsorship</a></li>
            <li><a href="/membership" className="hover:underline">Membership</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
