import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "../ui/navbar-menu";
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
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/user/userSlice.js";
import { CoolMode } from './../magicui/cool-mode';
import { Button } from "@mui/material";
import AnimationIcon from '@mui/icons-material/Animation';

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
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

  const handleLogout = async() => {
    dispatch(signOutStart());
    const res=await fetch('/api/auth/signout');
        const data = await res.json();
        console.log(data);
        
        if(data.success===false){
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
        <Avatar
          src={currentUser.avatar} // User avatar
          alt={currentUser.name}
          sx={{ width: 48, height: 48, margin: "auto" }}
        />
        <div className="text-black mt-2">{currentUser.name}</div>
        <div className="text-gray-600 text-sm mb-4">{currentUser.email}</div>
        <List>
          <ListItem disablePadding>
            <ListItemButton className="hover:bg-blue-500  transition duration-200 ease-in-out">
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
      backgroundColor: "#ffcccc",
      borderRadius: "0.5rem",
      padding : "0.5rem",
      transition: "background-color 0.2s ease-in-out", // Transition effect
      "&:hover": {
        backgroundColor: "red", // Red background on hover
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
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
    >
      <Menu setActive={setActive}>
        {/* Services Menu */}
        <MenuItem setActive={setActive} active={active} item="Events">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>

        {/* Pricing Menu */}
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>

        {/* Profile Avatar or Sign In */}
        <div className="ml-4 flex items-center">
          {currentUser ? (
            <span>
              <Avatar
                src={currentUser.avatar} // User avatar
                alt="Profile"
                className="rounded-full h-8 w-8 object-cover cursor-pointer border-gray-300"
                onClick={toggleDrawer(true)}
              />

              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </span>
          ) : (
            <span className="text-slate-700 hover:underline">Sign in</span>
          )}
        </div>
      </Menu>
      <div className="fixed bottom-4 right-4">
  <CoolMode>
    <Button>Spread the Art<AnimationIcon/></Button>
  </CoolMode>
</div>
    </div>
    
  );
}
