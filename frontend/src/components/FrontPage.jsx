import React from "react";
import MainDashboard from "../pages/MainDashboard";
import DashTable from "./Table";

const FrontPage = () => {
  return (
    <div>
      <MainDashboard />

      <div className="ml-[22rem] ">
        {/* ---------table=============== */}
        <div>
          <DashTable />
        </div>

        {/* ------Productive---employeee---table=============== */}

      </div>
    </div>
  );
};

export default FrontPage;
