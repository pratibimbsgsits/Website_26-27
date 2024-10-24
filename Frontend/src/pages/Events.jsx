import React, { useEffect, useState } from 'react';
import Card from '../components/general/Card';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import {
  deleteEvents,
  ongoingFailure,
  ongoingStart,
  ongoingSuccess,
  pastStart,
  pastSuccess,
  pastFailure,
  flagshipStart,
  flagshipSuccess,
  flagshipFailure,
  minipratibimbStart,
  minipratibimbSuccess,
  minipratibimbFailure,
  upcomingStart,
  upcomingSuccess,
  upcomingFailure,
} from '../redux/events/eventsSlice';

const Event = () => {
  const [selectedOption, setSelectedOption] = useState('Ongoing event');

  const dispatch = useDispatch();
  const { ongoing, past, flagship, minipratibimb, upcoming ,loading} = useSelector((state) => state.events);


  // Fetch ongoing events on component mount
  useEffect(() => {
    const fetchOngoingEvent = async () => {
      dispatch(ongoingStart());
      dispatch(deleteEvents());
      try {
        const res = await fetch("/api/get/events?status=ONGOING", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const response = await res.json();
          dispatch(ongoingSuccess(response.response.data)); // Store ongoing events in Redux
        } else {
          const errorResponse = await res.json();
          dispatch(ongoingFailure(errorResponse));
        }
      } catch (error) {
        dispatch(ongoingFailure(error));
        console.log("Network error:", error);
      }
    };

    fetchOngoingEvent();
  }, []);

  // Function to fetch event data based on the selected option
  const fetchEventData = async (eventType) => {
    let startAction, successAction, failureAction, url;

    switch (eventType) {
      case 'Past event':
        startAction = pastStart;
        successAction = pastSuccess;
        failureAction = pastFailure;
        url = "/api/get/events?status=PAST";
        break;
      case 'Flagship Event':
        startAction = flagshipStart;
        successAction = flagshipSuccess;
        failureAction = flagshipFailure;
        url = "/api/get/events?status=FLAGSHIP";
        break;
      case 'Mini Pratibimb':
        startAction = minipratibimbStart;
        successAction = minipratibimbSuccess;
        failureAction = minipratibimbFailure;
        url = "/api/get/events?status=MINI_PRATIBIMB";
        break;
      case 'Upcoming event':
        startAction = upcomingStart;
        successAction = upcomingSuccess;
        failureAction = upcomingFailure;
        url = "/api/get/events?status=UPCOMING";
        break;
      default:
        return;
    }

    // Dispatch start action
    dispatch(startAction());

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("called api");
      

      if (res.ok) {
        const response = await res.json();
        dispatch(successAction(response.response.data)); // Store data in Redux
      } else {
        const errorResponse = await res.json();
        dispatch(failureAction(errorResponse));
      }
    } catch (error) {
      dispatch(failureAction(error));
      console.log("Network error:", error);
    }
  };

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    // Check if the data for the selected option is already in Redux
    if (
      (newOption === 'Past event' && !past) ||
      (newOption === 'Flagship Event' && !flagship) ||
      (newOption === 'Mini Pratibimb' && !minipratibimb) ||
      (newOption === 'Upcoming event' && !upcoming)
    ) {
      fetchEventData(newOption);
    }
  };

  return (
    <div className="p-6 mt-16">
      <h2 className="text-7xl font-bold mb-4 text-center">Events</h2>

      {/* Radio Button Group */}
      <div className="flex w-full justify-center space-x-8 mb-4">
        {['Ongoing event', 'Past event', 'Flagship Event', 'Mini Pratibimb', 'Upcoming event'].map((option) => (
          <div key={option}>
            <input
              type="radio"
              className="btn-check hidden"
              name="eventOptions"
              id={option}
              value={option}
              autoComplete="off"
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label
              className={`btn font-medium text-sm cursor-pointer px-4 py-2 rounded-lg flex items-center transition duration-200 ${
                selectedOption === option
                  ? 'bg-blue-500 text-white border border-blue-500' // Solid bg for selected
                  : 'btn-outline-success text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500'
              }`}
              htmlFor={option}
            >
              <i className="fa-solid fa-circle-plus mr-1"></i>
              {option}
            </label>
          </div>
        ))}
      </div>
        <hr/>
      
        
        {loading ? (
        <div className="flex justify-center items-center h-64">
          <HashLoader color="#3ab5ac" />
        </div>
      ) : (
        <div className="flex gap-10 mt-5 justify-start flex-wrap">
          {selectedOption === 'Ongoing event' && ongoing && ongoing.map(event => (
            <Card key={event.event_id} event={event} />
          ))}
          {selectedOption === 'Past event' && past && past.map(event => (
            <Card key={event.event_id} event={event} />
          ))}
          {selectedOption === 'Flagship Event' && flagship && flagship.map(event => (
            <Card key={event.event_id} event={event} />
          ))}
          {selectedOption === 'Mini Pratibimb' && minipratibimb && minipratibimb.map(event => (
            <Card key={event.event_id} event={event} />
          ))}
          {selectedOption === 'Upcoming event' && upcoming && upcoming.map(event => (
            <Card key={event.event_id} event={event} />
          ))}
        </div>
      )}


    </div>
  );
};

export default Event;
