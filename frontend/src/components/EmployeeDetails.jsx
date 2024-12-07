import React from "react";
import MainDashboard from "../pages/MainDashboard";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Modal } from "flowbite-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import EmployeeTable from "./EmployeeTable";

const EmployeeDetails = () => {
  const [registerModal, setRegisterModal] = useState(false);
  const [bulkRegisterModal, setBulkRegisterModal] = useState(false);
  const [bulkUpdateModel, setBulkUpdateModel] = useState(false);
  const [value, setValue] = useState();
  //from fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [timezone, setTimezone] = useState("");
  const [shift, setShift] = useState("");
  const [employee, setEmployee] = useState("");
  const [user, setUser] = useState(null);
  const [allUser,setAllUser] = useState("")
  //form data as a object
  const userData = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    employeeCode,
    location,
    role,
    department,
    date,
    timezone,
    employee,
    shift,
  };

  //form handler
  const submitHandler = async (e) => {
    e.preventDefault();

    //call the api
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/employee/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmployee(response.data);
      console.log(response.data.data.date);

      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(response.data));
      //handle the response
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("User  does not register", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data);
        // console.log(parsedUser.data);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);


  return (
    <>
      <ToastContainer />
      <MainDashboard />
      <div>
        <div className="w-[100vw]">
          <div className="flex lg:flex-row sm:flex-col gap-4 items-center justify-center ">
            <Button variant="contained" onClick={() => setRegisterModal(true)}>
              Register Employee
            </Button>
            {/*----Register Employeee--Modal-------*/}
            <Modal
              className="pt-14"
              show={registerModal}
              onClose={() => setRegisterModal(false)}
            >
              <Modal.Body>
                <div class="max-w-2xl mx-auto bg-white p-16">
                  <form onSubmit={submitHandler}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          First name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter first name"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter last name"
                          required
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="company"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="company"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          id="phone"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="website"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          id="website"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter confirm password"
                          required
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mobile number <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={value}
                          onChange={setValue}
                          defaultCountry="IN"
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Employee code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter employee code"
                          required
                          onChange={(e) => setEmployeeCode(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your location"
                          required
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Role <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your role"
                          required
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Department <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your department"
                          required
                          onChange={(e) => setDepartment(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Date of Joinig <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter date of joining"
                          required
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Timezone
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Timezone"
                          required
                          onChange={(e) => setTimezone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Profile picture upload
                        </label>
                        <input
                          type="file"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="upload profile pic"
                          required
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Enter shift
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select shift"
                          required
                          onChange={(e) => setShift(e.target.value)}
                        />
                      </div>
                    </div>

                    <div></div>

                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setRegisterModal(false)}>Closed</Button>
              </Modal.Footer>
            </Modal>

            {/*--Bulk Register---modal----*/}
            <Button
              variant="contained"
              onClick={() => setBulkRegisterModal(true)}
            >
              Bulk Register
            </Button>
            <Modal
              show={bulkRegisterModal}
              onClose={() => setBulkRegisterModal(false)}
            >
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setBulkRegisterModal(false)}>
                  Closed
                </Button>
              </Modal.Footer>
            </Modal>
            {/*--Bulk---Update---modal----*/}
            <Button
              variant="contained"
              onClick={() => setBulkUpdateModel(true)}
            >
              Bulk Update
            </Button>
            <Modal
              show={bulkUpdateModel}
              onClose={() => setBulkUpdateModel(false)}
            >
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setBulkUpdateModel(false)}>
                  Closed
                </Button>
              </Modal.Footer>
            </Modal>
            {/*table*/}
          </div>
          <EmployeeTable/>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
