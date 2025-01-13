// import React, { useEffect, useState } from "react";
// import MainDashboard from "../pages/MainDashboard";
// import axios from "axios";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaRegEdit } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const EmpLocation = () => {
//   const [getallUser, setAllUser] = useState([]);
//   const [selectedUserLocation, setSelectedUserLocation] = useState(null);

//   const getAllUserRegisterDetails = async () => {
//     try {
//       const response = await axios.post(
//         `${
//           import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
//         }/api/v1/user/employee/all/registerDetails`
//       );
//       setAllUser(response.data.data.user);
//     } catch (error) {
//       console.log("Error fetching registered users:", error);
//     }
//   };

//   useEffect(() => {
//     getAllUserRegisterDetails();
//   }, []);

//   const openMapPopup = async (location) => {
//     const response = await fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         location
//       )}.json?access_token=${import.meta.env.MAPBOX_ACCESS_TOKEN}`
//     );
//     const data = await response.json();
//     const place = data.features[0];
//     if (place) {
//       const coordinates = place.center;
//       setSelectedUserLocation(coordinates); // Set the location to be displayed on the map
//     } else {
//       setSelectedUserLocation(null);
//     }
//   };

//   return (
//     <>
//       <MainDashboard />
//       <div>
//         <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl">
//           <h1 className="text-center pb-4 font-semibold text-2xl text-gray-800">
//             Employee Details
//           </h1>
//           <div className="bg-white shadow-md rounded-lg">
//             <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3">Full Name</th>
//                   <th className="px-6 py-3">Email</th>
//                   <th className="px-6 py-3">Location</th>
//                   <th className="px-6 py-3">Department</th>
//                   <th className="px-6 py-3">Role</th>
//                   <th className="px-6 py-3">Emp-code</th>
//                   <th className="px-6 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {getallUser.length > 0 ? (
//                   getallUser.map((user, index) => (
//                     <tr
//                       key={index}
//                       className="bg-white border-b transition-all"
//                     >
//                       <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                         {user.firstName} {user.lastName}
//                       </td>
//                       <td className="px-6 py-4">{user.email}</td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => openMapPopup(user.location)}
//                           className="text-blue-500 cursor-pointer"
//                         >
//                           View Location
//                         </button>
//                       </td>
//                       <td className="px-6 py-4">{user.department}</td>
//                       <td className="px-6 py-4">{user.role}</td>
//                       <td className="px-6 py-4">{user.employeeCode}</td>
//                       <td className="px-6 py-4 flex justify-center gap-3 items-center">
//                         <button
//                           className="text-blue-500 cursor-pointer"
//                           onClick={() => handleEditClick(user)}
//                         >
//                           <FaRegEdit />
//                         </button>
//                         <RiDeleteBin6Line
//                           className="text-red-500 cursor-pointer"
//                           onClick={() => deleteEmployee(user._id)}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-6 py-4 text-center text-gray-500"
//                     >
//                       No data available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {selectedUserLocation && (
//           <div
//             style={{
//               position: "fixed",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "80%",
//               height: "70%",
//               zIndex: 1000,
//               backgroundColor: "white",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <h2 className="text-center pb-4 font-semibold text-xl text-gray-800">
//               Employee Location
//             </h2>
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               <MapContainer
//                 center={[selectedUserLocation[1], selectedUserLocation[0]]}
//                 zoom={13}
//                 style={{ width: "100%", height: "100%" }}
//                 scrollWheelZoom={true}
//               >
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker
//                   position={[selectedUserLocation[1], selectedUserLocation[0]]}
//                 >
//                   <Popup>
//                     <span>Employee Location</span>
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default EmpLocation;

import React from 'react'

const EmpLocation = () => {
  return (
    <div>
      <h1>Emp Location</h1>
    </div>
  )
}

export default EmpLocation

