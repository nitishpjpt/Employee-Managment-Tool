import React, { useEffect, useState } from "react";
import axios from "axios";

const EmpActivityTracker = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [activeTime, setActiveTime] = useState(0); // Time in seconds

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmployeeId(parsedUser.data.userResponse._id);
      console.log("Employee ID from localStorage:", parsedUser.data.userResponse._id);
    }
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    let lastSentTime = 0; // Last sent active time in minutes

    const sendActivityData = async (timeInMinutes) => {
      console.log("Sending activity data:", timeInMinutes); // Debugging log
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/employee/${employeeId}/updateActiveTime`,
          { activeTime: timeInMinutes }
        );
        console.log("Activity data sent successfully", response); // Debugging log
      } catch (error) {
        console.error("Error sending activity data:", error);
      }
    };

    // Increment active time every 10 seconds
    const activityInterval = setInterval(() => {
      setActiveTime((prevTime) => {
        const newTime = prevTime + 10; // Add 10 seconds
        const timeInMinutes = Math.floor(newTime / 60);
        
        console.log("Updated active time:", newTime); // Debugging log
        if (timeInMinutes !== lastSentTime) {
          lastSentTime = timeInMinutes;
          sendActivityData(timeInMinutes);
        }

        return newTime;
      });
    }, 10000);

    return () => {
      clearInterval(activityInterval);
    };
  }, [employeeId]); // Only employeeId should be in the dependency array

  return (
    <div>
      <h2>Employee Activity Tracker</h2>
      <p>Active Time: {formatTime(activeTime)}</p>
    </div>
  );
};

export default EmpActivityTracker;
