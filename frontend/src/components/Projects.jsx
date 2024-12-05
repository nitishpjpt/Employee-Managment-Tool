import React from "react";
import MainDashboard from "../pages/MainDashboard";

const Projects = () => {
  return (
    <>
      <MainDashboard />
      {/*------select----options-----------*/}
      <div className="mx-[10rem] px-6 flex justify-end items-center gap-4 text-center shadow-lg rounded-lg">
        <p className="font-semibold">Select date range</p>
        <input type="date" />

        <form class="text-center flex flex-col">
          <label
            for="small"
            class=" font-semibold text-sm  text-gray-900 dark:text-white"
          >
            Select Status
          </label>
          <select
            id="small"
            class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Location</option>
            <option value="US">See all</option>
            <option value="CA">Not started</option>
            <option value="FR">In progress</option>
            <option value="DE">Hold</option>
            <option value="DE">Completed</option>
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
                  Project Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Assignees
                </th>
                <th scope="col" class="px-6 py-3">
                  Modules
                </th>
                <th scope="col" class="px-6 py-3">
                  Task
                </th>
                <th scope="col" class="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3">
                  End Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Time
                </th>
                <th scope="col" class="px-6 py-3">
                  Progress
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
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
                <td class="px-6 py-4">05/05/2024</td>
                <td class="px-6 py-4">10:00 AM</td>
                <td class="px-6 py-4">6:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">nikhil</td>
                <td class="px-6 py-4">404</td>
                <td class="px-6 py-4">nothing</td>

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
                <td class="px-6 py-4">10/09/2024</td>
                <td class="px-6 py-4">12:00 AM</td>
                <td class="px-6 py-4">6:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">ankit</td>
                <td class="px-6 py-4">406</td>
                <td class="px-6 py-4">nothing</td>

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
                <td class="px-6 py-4">12/10/2024</td>
                <td class="px-6 py-4">9:00 AM</td>
                <td class="px-6 py-4">4:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">nikhil</td>
                <td class="px-6 py-4">404</td>
                <td class="px-6 py-4">approve</td>

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

export default Projects;
