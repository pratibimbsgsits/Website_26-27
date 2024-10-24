import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Card = ({ event }) => {
  // Extracting properties from the event prop
  const { event_name, description, start_date, location, event_logo, event_poster, ticket_price,status} = event;

  
  const formattedStartDate = new Date(start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="max-w-sm bg-slate-200 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-6">
      <div className="overflow-hidden">
        <img
          // src={event_logo}
          src="https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={event_name}
          className="object-cover h-10 w-1/2"
        />
      </div>
        <h2 className="text-2xl font-bold mb-1 text-gray-900">{event_name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600"><strong>Location:</strong> {location}</p>
        <p className="text-gray-600"><strong>Start Date:</strong> {formattedStartDate}</p>
      </div>
      
      {event_poster && (
        <div className="overflow-hidden">
          <img
            // src={event_poster}
            src="https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={event_name}
            className="object-cover h-[110px] w-full mt-2 hover:scale-110 transition-scale duration-300"
          />
        </div>
      )}
      <div className="p-6 flex justify-between">
        {status=="ONGOING" && (
          <>
            <button className="text-sm font-medium text-slate-700" >
              Ticket Price: ${ticket_price}
            </button>
            <button className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full hover:bg-slate-700" onClick={handleOpen}>
              Register
            </button>
            <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
