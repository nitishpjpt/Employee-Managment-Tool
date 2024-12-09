import React, { useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import Button from "@mui/material/Button";
import { Modal } from "flowbite-react";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
  //project modal for opeinig modals
  const [projectModal, setProjectModal] = useState(false);
  //state for handle the form filed
  const [projectName, setProjectName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [selectMember, setSelectMember] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  //state for stored the response
  const [project, setProject] = useState("");
  //useContext
  const { projectDetails } = useContext(ProjectContext);
  const projectObj = {
    projectName,
    managerName,
    selectMember,
    startDate,
    endDate,
    description,
  };

  // function for handle the form
  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/projectDetails`,
        projectObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProject(response.data.data.project);
      // console.log(response.data.data.project);
      //handle the response
      toast.success("Project Added Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Project does not creatd", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
        <Button variant="contained" onClick={() => setProjectModal(true)}>
          Add Project Details
        </Button>

        {/*----Register Employeee--Modal-------*/}
        <Modal
          className="pt-14"
          show={projectModal}
          onClose={() => setProjectModal(false)}
        >
          <Modal.Body>
            <div class=" max-w-4xl mx-auto bg-white p-16">
              <form onSubmit={submitHanlder}>
                <div className="pb-5">
                  <label
                    for="first_name"
                    class=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Project Name"
                    required
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div class="grid gap-8 mb-6 lg:grid-cols-2">
                  <div>
                    <label
                      for="company"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Manager's name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter manager name"
                      required
                      onChange={(e) => setManagerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Select Member <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter number of members"
                      required
                      onChange={(e) => setSelectMember(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="visitors"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="visitors"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter employee code"
                      required
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="visitors"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="visitors"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select shift"
                      required
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project Description
                  </label>
                  <textarea
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500border rounded-lg"
                    cols={53}
                    rows={4}
                    placeholder="Write Description Here..."
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Project
                </button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setProjectModal(false)}>Closed</Button>
          </Modal.Footer>
        </Modal>
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
            {projectDetails.length > 0 ? (
              projectDetails.map((item, index) => (
                <tbody key={index}>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.projectName}
                    </th>
                    <td class="px-6 py-4">{item.selectMember}</td>
                    <td class="px-6 py-4">{item.managerName}</td>
                    <td class="px-6 py-4">{item.startDate || "not found"} </td>
                    <td class="px-6 py-4">{item.startDate || "not found"}</td>
                    <td class="px-6 py-4">404</td>
                    <td class="px-6 py-4">nothing</td>
                    <td class="px-6 py-4">nothing</td>

                    <td className=" text-center flex justify-center gap-1 items-center">
                      <IoIosSettings className="text-blue-400" />
                      <RiDeleteBin6Line className="text-red-500" />
                      <IoEyeSharp className="text-blue-400" />
                    </td>

                    <td
                      class="px-6 py-4"
                      className="flex justify-center gap-1 items-center py-8"
                    ></td>
                  </tr>
                </tbody>
              ))
            ) : (
              <p>Data not found</p>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Projects;
