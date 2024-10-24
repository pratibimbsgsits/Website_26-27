import React from "react";
import { PlaceholdersAndVanishInputDemo } from "../components/general/PlaceholdersAndVanishInputDemo";
import { CoolMode } from "../components/magicui/cool-mode";
import AnimationIcon from "@mui/icons-material/Animation";
import { Button } from "@mui/material";
import { AnimatedTooltip } from "../components/accertinityui/animated-tooltip";
import { motion } from "framer-motion";
import { ImagesSlider } from "../components/accertinityui/image-slider";


const people = [
  {
    id: 1,
    name: "Adarsh Landge",
    designation: "Web Head",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Eklavya Parihar",
    designation: "Web Assistant",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Vibhuti Baldwa",
    designation: "Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const images = [
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783423/rjcrohc5kjered7k9e0u.heic?http2=false",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783443/wx9b0fqtjbrefbutytk2.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783451/muc91zcge8ieu73wcv92.heic?http2=false",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783464/uhhgbhm9iy3wqsdrdmu8.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783471/key2lzept0d4lfauqj85.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783477/ibkqx7avojzcgptnpd5h.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783494/g10d8iewbzhjxitzx6qa.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783496/nd5lefydm7boxosreni0.jpg"
];



export default function Home() {
  return (
    <div className="bg-slate-100">
     
      <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Pratibimb <br /> The Reflection of Art
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Connect with Us →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>

    <div className="font-bold text-7xl m-10 bg-gradient-to-r from-blue-400 to-purple-950 bg-clip-text text-transparent">
  Latest of Pratibimb
</div>


      <PlaceholdersAndVanishInputDemo />
     

      <div className="font-bold text-4xl text-center mb-8" >Made with love</div>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>
      <div className="fixed bottom-4 right-4">
        <CoolMode >
          <Button >
            Spread the Art
            <AnimationIcon />
          </Button>
        </CoolMode>
      </div>

      
    </div>
  );
}
