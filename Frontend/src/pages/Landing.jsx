import React, { useState } from 'react';

const LoginScreen = () => {

    let [disableGoogle,setDisableGoogle]=useState(true);

  return (
    <div
    className="flex items-center justify-center min-h-screen bg-cover bg-center "
    style={{ backgroundImage: "url('./LandingPageBg.png')" }}
  >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <img
            src="/PratibimbLogo.png"
            alt="User Avatar"
            className="w-20 mx-auto "
          />
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mt-4">Register </h2>
        </div>
        
        <form>
          <div className="mb-4">
            <label htmlFor="enrollment" className="block text-left font-medium text-gray-700 ">
              Enrollment Number
            </label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your enrollment number"
            />
          </div>
          
          <button
          type="button" disabled={{disableGoogle}}
          className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
          
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>
        
        Already Have an Account ? Login with <i className="bx bxl-google"></i>
       
      </div>
    </div>
  );
};

export default LoginScreen;
