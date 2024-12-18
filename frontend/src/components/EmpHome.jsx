import React from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { FaCheckCircle } from "react-icons/fa";

const EmpHome = () => {
  return (
    <>
      <EmpDashboard />
      {/*--------Table-------------*/}
      <div>
        <div class="relative overflow-x-auto  pt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Present Dates
                </th>
                <th scope="col" class="px-6 py-3">
                  Absent Dates
                </th>
                <th scope="col" class="px-6 py-3">
                  Request Leave Half Day
                </th>
                <th scope="col" class="px-6 py-3">
                  Request Leave Full Day
                </th>
                <th scope="col" class="px-6 py-3">
                  Reason For Leave Request
                </th>
                <th scope="col" class="px-6 py-3">
                  Leave Approve Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Nitish
                </th>
                <td class="px-6 py-4">15/05/2024</td>
                <td class="px-6 py-4">N/A</td>
                <td class="px-6 py-4">Request</td>
                <td class="px-6 py-4">N/A</td>
                <td class="px-6 py-4">Fever</td>
                <td className="px-6 py-4">Approve <FaCheckCircle className="text--500"/></td>

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

export default EmpHome;
