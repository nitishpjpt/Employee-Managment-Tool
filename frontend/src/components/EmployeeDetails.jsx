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
import { IoMdPerson } from "react-icons/io";
import { BiSolidBank } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const [registerModal, setRegisterModal] = useState(false);
  const [bulkRegisterModal, setBulkRegisterModal] = useState(false);
  const [bulkUpdateModel, setBulkUpdateModel] = useState(false);
  const [attendenceModel, setAttendenceModel] = useState(false);

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
  const [salary, setSalary] = useState("");
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState("");
  // state for the background verification form
  const [addhar, setAddhar] = useState("");
  const [pan, setPan] = useState("");
  const [driving, setDriving] = useState("");
  const [voterCard, setVoterCard] = useState("");
  const [uan, setUan] = useState("");
  // state for add bank account details form
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const navigate = useNavigate();
  //register form data as a object
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
    salary,
    employee,
  };
  // backgroundVerification form object
  const bgObj = {
    addhar,
    pan,
    driving,
    voterCard,
    uan,
  };
  // BankDetails form object
  const bankObj = {
    accountName,
    accountNumber,
    holderName,
    ifscCode,
  };
  //register form handler
  const submitHandler = async (e) => {
    e.preventDefault();

    //Register employee api
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmployee(response.data);

      // Store user data in local storage
      localStorage.setItem(
        "EmployeeId",
        JSON.stringify(response.data.data._id)
      );

      //handle the response
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      setRegisterModal(false);
    } catch (error) {
      toast.error("User  does not register", {
        position: "top-right",
        autoClose: 1000,
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

  // to retrive stored local storage data
  useEffect(() => {
    const storedUser = localStorage.getItem("EmployeeId");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  });

  //background verification form handler
  const verificationHandler = async (e) => {
    const storedUser = localStorage.getItem("EmployeeId");
    if (storedUser) {
      try {
        var parsedUser = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }

    e.preventDefault();

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${parsedUser}/verify`,
        bgObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        "Employee background verification details added successfully",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
      // Ensures page reloads after employee details
      setBulkRegisterModal(false);
    } catch (error) {
      toast.error("Employee background verification details does not added");
    }
  };
  // bank verfication handler
  const bankVerificationHandler = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("EmployeeId");
    if (storedUser) {
      try {
        var parsedUser = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${parsedUser}/bankDetails/verify`,
        bankObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Employee bank details added successfully", {
        position: "top-right",
        autoClose: 1000,
      });
      setBulkUpdateModel(false);
    } catch (error) {
      toast.error("Employee bank details does not added");
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <MainDashboard />
      <div>
        <div className="w-[100vw]">
          <div className=" lg:ml-[15rem] xs:ml-[5rem] flex lg:flex-row sm:flex-col gap-4 items-center justify-center ">
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
                <div class="max-w-2xl xs:p-[4rem] mx-auto bg-white p-16">
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
                          Confirm Password{" "}
                          <span className="text-red-500">*</span>
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
                          Salary <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your department"
                          required
                          onChange={(e) => setSalary(e.target.value)}
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
                          Profile picture upload
                        </label>
                        <input
                          type="file"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="upload profile pic"
                          className="rounded-full"
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
              <Modal.Footer className="xs:pl-[3rem]">
                <Button onClick={() => setRegisterModal(false)}>Closed</Button>
              </Modal.Footer>
            </Modal>

            {/*--Background Verification---modal----*/}
            <Button
              variant="contained"
              onClick={() => setBulkRegisterModal(true)}
            >
              Background Verification
            </Button>
            <Modal
              show={bulkRegisterModal}
              onClose={() => setBulkRegisterModal(false)}
            >
              <Modal.Body>
                <div class="max-w-2xl mx-auto bg-white p-6">
                  <h1 className="pb-10 flex justify-center items-center gap-2 font-bold">
                    Background Verification{" "}
                    <IoMdPerson className="text-[#1976D2]" />
                  </h1>
                  <form onSubmit={verificationHandler}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="aadhar_number"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Aadhar Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="aadhar_number"
                          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Aadhar Number must be 10 digits"
                          title="Aadhar Number must be 10 digits"
                          required
                          onChange={(e) => setAddhar(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="pan_number"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          PAN Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="pan_number"
                          required
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="must be in the format: ABCDE1234F"
                          title="PAN Number must be in the format: ABCDE1234F"
                          onChange={(e) => setPan(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="driving_licence"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Driving Licence{" "}
                        </label>
                        <input
                          type="text"
                          id="driving_licence"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="must be in the format: XX00XXXXXXXXX"
                          title="Driving Licence must be in the format: XX00XXXXXXXXX"
                          onChange={(e) => setDriving(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="voter_id"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Voter ID
                        </label>
                        <input
                          type="text"
                          id="voter_id"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="must be in the format: ABC1234567"
                          title="must be in the format: ABC1234567"
                          onChange={(e) => setVoterCard(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="uan_number"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          UAN Number
                        </label>
                        <input
                          type="text"
                          id="uan_number"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="UAN must be in 12 digits"
                          title="UAN Number must be 12 digits"
                          onChange={(e) => setUan(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer className="xs:pl-[4rem]">
                <Button onClick={() => setBulkRegisterModal(false)}>
                  Closed
                </Button>
              </Modal.Footer>
            </Modal>
            {/*--Bank Account---Update---modal----*/}
            <Button
              variant="contained"
              onClick={() => setBulkUpdateModel(true)}
            >
              Bank Account
            </Button>
            <Modal
              show={bulkUpdateModel}
              onClose={() => setBulkUpdateModel(false)}
            >
              <Modal.Body>
                <div class="max-w-2xl mx-auto bg-white p-6">
                  <h1 className="pb-10 flex justify-center items-center gap-2 font-bold">
                    Bank Account Verification
                    <BiSolidBank className="text-[#1976D2] text-xl" />
                  </h1>
                  <form onSubmit={bankVerificationHandler}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-1">
                      <div>
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Account Holder's Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="account_holder_name"
                          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                          onChange={(e) => setHolderName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="account_number"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Account Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="account_number"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Account Number"
                          title="Account Number must be between 9 to 18 digits"
                          required
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="bank_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Bank Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="bank_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Bank Name"
                          onChange={(e) => setAccountName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="ifsc_code"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          IFSC Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="ifsc_code"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter IFSC Code"
                          title="IFSC Code must be in the format: ABCD0XXXXXX"
                          required
                          onChange={(e) => setIfscCode(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Modal.Body>

              <Modal.Footer className="xs:pl-[4rem]">
                <Button onClick={() => setBulkUpdateModel(false)}>
                  Closed
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={attendenceModel}
              onClose={() => setAttendenceModel(false)}
              className="pt-10"
            >
              <Modal.Body>
                <div class="max-w-2xl mx-auto bg-white p-6 ">
                  <h1 className="pb-10 flex justify-center items-center gap-2 font-bold">
                    Attendence Details
                    <BiSolidBank className="text-[#1976D2] text-xl" />
                  </h1>
                  <form>
                    <div class="">
                      <div className="flex items-center p-4 gap-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />

                        {/*------shift---added-----button-------*/}
                        <Button variant="contained">Add Shift</Button>
                      </div>

                      <div className="flex items-center p-4 gap-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>

                      <div className="flex items-center gap-4 p-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>
                      <div className="flex items-center gap-4 p-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>
                      <div className="flex items-center gap-4 p-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>
                      <div className="flex items-center gap-4 p-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>
                      <div className="flex items-center gap-4 p-4">
                        <label
                          for="account_holder_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Monday <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="checkbox"
                          id="account_holder_name"
                          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Account Holder's Name"
                          required
                        />
                        <Button variant="contained">ADD Shift</Button>
                      </div>
                    </div>

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
                <Button onClick={() => setAttendenceModel(false)}>
                  Closed
                </Button>
              </Modal.Footer>
            </Modal>

            {/*table*/}
          </div>
          <EmployeeTable />
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
