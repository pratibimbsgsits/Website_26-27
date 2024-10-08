import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
export default function SignIn() {
  const [enrollment, setEnrollment] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignUp = () => {
    if (enrollment.length !== 12) {
      setError("Enrollment number should be of size 12");
    } else {
      setError("");
      // Add your Google Sign-In logic here
      console.log("Google Sign-Up initiated");
    }
  };

  const handleEnrollmentChange = (e) => {
    setEnrollment({
        ...enrollment,
        [e.target.id]: e.target.value, 
      });
      console.log(enrollment);
    if (error) {
      setError(""); // Clear the error when the input field is clicked or changed
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('./LandingPageBg.png')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-700 text-sm ">
        <img
          src="/PratibimbLogo.png"
          alt="User Avatar"
          className="w-24 mx-auto"
        />
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mt-4">Register</h2>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="enrollment" className="block text-left font-medium text-gray-700 ">
              Enrollment Number<Tooltip title="Pratibimb will not disclose your identity to anyone"  placement="right">
      <IconButton>
        <HelpIcon />
      </IconButton>
    </Tooltip>
            </label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={enrollment}
              onChange={handleEnrollmentChange} 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-base"
              placeholder="0801XXXXXXXX"
            />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300 text-base"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          {error && (
            <div className="text-red-500 text-xs mt-1">
              {error}
            </div>
          )}
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <div className="text-center">
          Already Have an Account? Login with <GoogleIcon />
        </div>
      </div>
    </div>
  );
}
