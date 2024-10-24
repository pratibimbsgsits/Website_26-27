import React, { useState } from "react";
import { cn } from "../../utils/cn.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice.js";
import { motion } from "framer-motion";

const navItems = [
  { name: "Team", path: "/team" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Events", path: "/events" },
  { name: "Contact Us", path: "/contact-us" },
];

export function NavbarDemo() {
  return (
    <div className="relative w-full flex  justify-center ">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // React-router navigate function
  const dispatch = useDispatch();
  const auth = getAuth(); // Initialize Firebase Auth

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    
  };

  const handleLogout = async () => {
    dispatch(signOutStart());
    const res = await fetch("/api/auth/signout");
    const data = await res.json();

    if (data.success === false) {
      dispatch(signOutFailure(data.message));
      return;
    }
    signOut(auth)
      .then(() => {
        toast.success("You're Signed Out !");
        dispatch(signOutSuccess());
        // Clear any session cookies
        navigate("/sign-up"); // Navigate to the sign-up page
      })
      .catch((error) => {
        dispatch(signOutFailure(error.message));
      });
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: "#f0f4f8", // Light background color
        color: "#333", // Darker text color for contrast
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/* Top User Profile Section */}
      <Box sx={{ padding: "16px", textAlign: "center" }}>
       { currentUser.avatar && 
        <Avatar
          src={currentUser.avatar} // User avatar
          alt={currentUser.name}
          sx={{ width: 48, height: 48, margin: "auto" }}
        />}
        <div className="text-black mt-2">{currentUser.name}</div>
        <div className="text-gray-600 text-sm mb-4">{currentUser.email}</div>
        <List>
          <ListItem disablePadding>
            <ListItemButton className="hover:bg-blue-600 rounded-lg transition duration-200 ease-in-out">
              <ListItemIcon sx={{ color: "#333" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Your profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component="button"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#E97451",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                transition: "background-color 0.2s ease-in-out", // Transition effect
                "&:hover": {
                  backgroundColor: "#F88379", // Red background on hover
                },
              }}
            >
              <ListItemIcon sx={{ color: "#333" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Options can go here */}
    </Box>
  );

  return (
    <div className="flex items-center justify-between fixed top-3 left-0 right-0 max-w-4xl mx-auto space-x-5 bg-slate-600 text-slate-100 px-6 py-3 rounded-full shadow-lg z-50">
      {/* Logo */}
      <Link to="/">
        <img
          src="./PratibimbLogo2.png"
          alt="Pratibimb Logo"
          className="h-10 w-auto"
        />
      </Link>
      {/* Navigation Links with Hover Effects */}
      <div className="hidden sm:flex space-x-6">
        {navItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className="relative text-white cursor-pointer font-bold"
          >
            <motion.div
              initial={{ opacity: 0.8, y: 0 }}
              whileHover={{
                scale: 1.1, // Scale effect
                color: "#ffffff",
                y: -2, // Moves slightly up
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              {item.name}
              <motion.div
                className="absolute left-0 -bottom-1 h-[2px] bg-white w-full origin-left"
                initial={{ scaleX: 0 }} // Initial scale of the underline
                whileHover={{ scaleX: 1 }} // On hover, it expands
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Profile Avatar */}
      
        <Avatar
          src={currentUser.avatar} // User avatar
          alt={currentUser.name}
          className="rounded-full h-10 w-10 object-cover cursor-pointer border-gray-300"
          onClick={toggleDrawer(true)}
        />

        {/* Drawer */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
    </div>
  );
}
