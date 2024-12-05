import React from "react";
import MainDashboard from "../pages/MainDashboard";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

const TimeSheet = () => {
  return (
    <>
      <MainDashboard />
      {/*select options*/}
      <div className="shadow-lg flex ">
        <form class="max-w-sm lg:mx-[15rem] md:mx-auto flex lg:flex-row md:flex-col sm:flex-col lg:gap-10">
          <label
            for="small"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <select
            id="small"
            class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Location</option>
            <option value="US">Delhi</option>
            <option value="CA">Noida</option>
            <option value="FR">Gurugram</option>
            <option value="DE">Noida</option>
          </select>
          <label
            for="default"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <select
            id="default"
            class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a department</option>
            <option value="US">IT Manager</option>
            <option value="CA">IT Director</option>
            <option value="FR">CTO</option>
            <option value="DE">CIO</option>
          </select>
          <label
            for="large"
            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Employee
          </label>
          <select
            id="large"
            class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a employee</option>
            <option value="US">Deepak</option>
            <option value="CA">Ajay</option>
            <option value="FR">Ayush</option>
            <option value="DE">Abhi</option>
          </select>
        </form>
      </div>
      {/*--------Table-------------*/}
      <div>
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
                  Employee Code
                </th>
                <th scope="col" class="px-6 py-3">
                  Location
                </th>
                <th scope="col" class="px-6 py-3">
                  Department
                </th>
                <th scope="col" class="px-6 py-3">
                  Clock-in
                </th>
                <th scope="col" class="px-6 py-3">
                  Clock-out
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Hour
                </th>
                <th scope="col" class="px-6 py-3">
                  Office Hour
                </th>
                <th scope="col" class="px-6 py-3">
                  Active Hour
                </th>
                <th scope="col" class="px-6 py-3 text-[#35A745]">
                  Productive
                </th>
                <th scope="col" class="px-6 py-3 text-red-500">
                  Unproductive
                </th>
                <th scope="col" class="px-6 py-3">
                  Neutral
                </th>
                <th scope="col" class="px-6 py-3 text-yellow-300">
                  Idle
                </th>
                <th scope="col" class="px-6 py-3">
                  Offline Hours
                </th>
                <th scope="col" class="px-6 py-3">
                  Break
                </th>
                <th scope="col" class="px-6 py-3 text-blue-400">
                  Productivity
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
                <td class="px-6 py-4">102</td>
                <td class="px-6 py-4">Delhi</td>
                <td class="px-6 py-4">Technical Lead</td>
                <td class="px-6 py-4">7:00 AM</td>
                <td class="px-6 py-4">8:00 PM</td>
                <td class="px-6 py-4">10</td>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">8</td>
                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ajay
                </th>
                <td class="px-6 py-4">Ajay123@gmail.com</td>
                <td class="px-6 py-4">104</td>
                <td class="px-6 py-4">Noida</td>
                <td class="px-6 py-4">IT</td>
                <td class="px-6 py-4">6:00 AM</td>
                <td class="px-6 py-4">4:00 PM</td>
                <td class="px-6 py-4">8</td>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">10</td>
                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abhi
                </th>
                <td class="px-6 py-4">Abhi123@gmail.com</td>
                <td class="px-6 py-4">109</td>
                <td class="px-6 py-4">Gurugram</td>
                <td class="px-6 py-4">IT</td>
                <td class="px-6 py-4">11:00 AM</td>
                <td class="px-6 py-4">2:00 PM</td>
                <td class="px-6 py-4">7</td>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">1</td>
                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TimeSheet;
