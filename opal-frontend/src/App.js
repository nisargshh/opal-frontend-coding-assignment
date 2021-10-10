import React, { useState, useEffect, useRef } from "react";

import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ScheduleCard from "./schedule-card/schedule-card";
import AddSchedule from "./addSchedule/add-schedule";
import { Button } from "react-bootstrap";

function App() {
  //States
  const [schedule, setSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});
  let scheduleCards = [];

  //Update the schedule when added and on component mount
  useEffect(() => {
    axios.get("http://localhost:3000/schedules").then((response) => {
      setSchedule(response.data);
    });
  }, [schedule]);

  // Add all the schedules to an array
  for (var i = 0; i < schedule.length; i++) {
    let days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    let repeatedDays = [];
    for (let j = 0; j < days.length; j++) {
      if (schedule[i].days[days[j]]) {
        repeatedDays.push(days[j]);
      }
    }
    scheduleCards.push(
      <ScheduleCard
        app={schedule[i].app}
        startTime={schedule[i].startTime}
        endTime={schedule[i].endTime}
        days={repeatedDays}
      />
    );
  }

  // Form submit and post request
  function handleFormSubmit(form) {
    axios.post("http://localhost:3000/schedules", form).then((res) => {
      console.log(res);
    });
  }

  // Handle Open and Close for Form Modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="App">
      <h1>Opal Schedules</h1>{" "}
      <Button variant="primary" onClick={handleShow}>
        Add Schedule
      </Button>
      <div>{scheduleCards}</div>
      <AddSchedule
        show={showModal}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
