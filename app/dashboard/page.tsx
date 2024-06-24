"use client";

import React from "react";
import DashBoard from "@/components/ui/dashboard/index";
import DashboardChart from "@/components/ui/dashboard/charts";

const Page: React.FC<any> = () => {
  return (
    <React.Fragment>
      <DashBoard>
        <DashboardChart />
      </DashBoard>
    </React.Fragment>
  );
};


 
export default Page