import React from "react";
import MainDashboard from "../pages/MainDashboard";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const EmployeeDetails = () => {
  const [registerModal, setRegisterModal] = useState(false);
  const [bulkRegisterModal, setBulkRegisterModal] = useState(false);
  const [bulkUpdateModel, setBulkUpdateModel] = useState(false);
  const [value, setValue] = useState();
  return (
    <>
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
                  <form>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="company"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="company"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="phone"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your password"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="website"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="website"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter confirm password"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mobile number
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
                          Employee code
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter employee code"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your location"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your role"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your department"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Date of Joinig
                        </label>
                        <input
                          type="date"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter date of joining"
                          required
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
          <div class="relative overflow-x-auto ml-[5rem] pt-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email-id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Emp-code
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Os
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Computer Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Version
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Details
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Abhay
                  </th>
                  <td class="px-6 py-4">abhi123@gmail.com</td>
                  <td class="px-6 py-4">Delhi</td>
                  <td class="px-6 py-4">IT</td>
                  <td class="px-6 py-4">Technical Lead</td>
                  <td class="px-6 py-4">404</td>
                  <td class="px-6 py-4">404</td>
                  <td class="px-6 py-4">dell</td>
                  <td class="px-6 py-4">2</td>
                  <td class="px-6 py-4">none</td>
                  <td
                    class="px-6 py-4"
                    className="flex justify-center gap-1 items-center py-8"
                  >
                    <IoIosSettings className="text-blue-400" />
                    <RiDeleteBin6Line className="text-red-500" />
                    <IoEyeSharp className="text-blue-400" />
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Ajay
                  </th>
                  <td class="px-6 py-4">Ajay123@gmail.com</td>
                  <td class="px-6 py-4">Delhi</td>
                  <td class="px-6 py-4">IT</td>
                  <td class="px-6 py-4">CTO</td>
                  <td class="px-6 py-4">505</td>
                  <td class="px-6 py-4">404</td>
                  <td class="px-6 py-4">dell</td>
                  <td class="px-6 py-4">2</td>
                  <td class="px-6 py-4">none</td>
                  <td
                    class="px-6 py-4"
                    className="flex justify-center gap-1 items-center py-8"
                  >
                    <IoIosSettings className="text-blue-400" />
                    <RiDeleteBin6Line className="text-red-500" />
                    <IoEyeSharp className="text-blue-400" />
                  </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Abhi
                  </th>
                  <td class="px-6 py-4">Abhi123@gmail.com</td>
                  <td class="px-6 py-4">Gurugram</td>
                  <td class="px-6 py-4">IT</td>
                  <td class="px-6 py-4">none</td>
                  <td class="px-6 py-4">504</td>
                  <td class="px-6 py-4">404</td>
                  <td class="px-6 py-4">dell</td>
                  <td class="px-6 py-4">2</td>
                  <td class="px-6 py-4">none</td>
                  <td
                    class="px-6 py-4"
                    className="flex justify-center gap-1 items-center py-8"
                  >
                    <IoIosSettings className="text-blue-400" />
                    <RiDeleteBin6Line className="text-red-500" />
                    <IoEyeSharp className="text-blue-400" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
