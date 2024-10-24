import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { CardBody, CardContainer } from "../components/accertinityui/3d-card";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState("");
  const [AdminAuthenticate, setAdminAuthenticate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      if (!formData.enrollment || formData.enrollment.length !== 12) {
        setErr("Enrollment number should be of size 12");
      } else {
        setErr("");
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);

        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
            enrollment: formData.enrollment,
          }),
        });

        const data = await res.json();
        if (data.statusCode == 500) {
          toast.error(data.message);
          signInFailure(data);
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
        toast.success("You're Successfully Signed Up");
      }
    } catch (error) {
      toast.error("Could not signup with google");
      console.log("could not signup with google", error);
    }
  };

  const handleEnrollmentChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (err) {
      setErr(""); // Clear the error when the input field is clicked or changed
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: result.user.email, enrollment: false }),
      });

      const data = await res.json();
      console.log(data);
      
      if (data.errors && data.errors.status == 404) {
        toast.error(data.errors.detail);
        signInFailure(data.errors);
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("You're Successfully Signed In");
    } catch (error) {
      console.log("could not signup with google", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center p-4 bg-opacity-50"
      style={{
        backgroundImage: "url('./LandingPageBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
       
      }}
    >
      {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black opacity-40"></div>
      <CardContainer className="inter-var z-10" >
        <CardBody className=" text-black shadow-lg relative group/card  border-white/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6">
          <div className="bg-slate-50 p-8 rounded-lg  w-full text-black text-sm">
            <img
              src="/PratibimbLogo3.png"
              alt="Logo"
              className="w-24 mx-auto mb-4"
            />

            {!AdminAuthenticate ? (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold font-serif">Register</h2>
                </div>

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="enrollment"
                      className="block text-left font-medium"
                    >
                      Enrollment Number
                      <span>
                        <Tooltip
                          title="Pratibimb will not disclose your identity to anyone"
                          placement="right"
                        >
                          <IconButton>
                            <HelpIcon className="text-slate-800" />
                          </IconButton>
                        </Tooltip>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="enrollment"
                      name="enrollment"
                      onChange={handleEnrollmentChange}
                      className="mt-1 w-full px-4 py-2 bg-gray-600  text-white   rounded-lg  text-base focus:ring focus:ring-blue-400 focus:outline-none"
                      placeholder="0801XXXXXXXX"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center bg-blue-900 py-2 rounded-lg hover:bg-blue-800 transition duration-300 text-base text-white"
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google logo"
                      className="w-5 h-5 mr-2"
                    />
                    Sign up with Google
                  </button>

                  {err && (
                    <div className="text-red-500 text-xs mt-1">{err}</div>
                  )}
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-gray-600 ">OR</span>
                  </div>
                </div>

                <div className="text-center">
                  Already Have an Account? Login with{" "}
                  <span
                    onClick={handleGoogleLogin}
                    className="cursor-pointer text-violet-950"
                  >
                    <GoogleIcon />
                  </span>
                </div>

                <div
                  className="cursor-pointer mt-3 flex items-center justify-center text-blue-600 hover:text-blue-700 transition duration-200"
                  onClick={() => setAdminAuthenticate(true)}
                >
                  Admin Login
                  <ArrowCircleRightIcon className="ml-2" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-black">Admin Login</h2>
                </div>
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="username"
                      className="block text-left font-medium text-black mb-2"
                    >
                      Admin Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-600 text-white rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                      placeholder="admin@example.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-left font-medium text-black mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-600 text-slate-50 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div
                      className="cursor-pointer text-blue-800 hover:text-blue-900 transition duration-200"
                      onClick={() => setAdminAuthenticate(false)}
                    >
                      User Login
                      <ArrowCircleRightIcon className="ml-2" />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-700 text-slate-50 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
