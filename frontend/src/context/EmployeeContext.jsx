import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const EmployeeContext = createContext();

// Create the provider component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
 

  // Function to fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/employee/all/registerDetails`
      );
      setEmployees(response.data.data.user || []); // Assuming `user` contains the array of employee details
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};
