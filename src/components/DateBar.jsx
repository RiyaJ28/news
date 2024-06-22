import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function DateBar() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const d = current.getDay();
  let day = daysOfWeek[d];
  //const time = current.getTime();
  const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);
  return (
    <nav className="d-flex justify-content-between date">
      <div>{date}</div> <div>{day}</div>
      <div>{dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}</div>
    </nav>
  );
}

export default DateBar;