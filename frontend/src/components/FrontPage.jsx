import React from "react";
import MainDashboard from "../pages/MainDashboard";
import DashTable from "./Table";

const FrontPage = () => {
  return (
    <div>
      <MainDashboard />

      <div className="mx-[5rem]">
        {/* ---------table=============== */}
        <div>
          <DashTable />
        </div>

        {/* ------Productive---employeee---table=============== */}

        <div className="grid lg:grid-cols-2 md:grid-cols-1">
          <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
            <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
              Top 10 Productive Employees
            </h1>
            <form class="text-center flex flex-row">
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

            {/*----------table-------------*/}
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Employee Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Time(hours)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Abhi
                  </th>
                  <td class="px-6 py-4">10hr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
            <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
              Top 10 Non Productive Employees
            </h1>
            <form class="text-center flex flex-row">
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

            {/*----------table-------------*/}
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Employee Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Time(hours)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Ajay
                  </th>
                  <td class="px-6 py-4">7hr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
