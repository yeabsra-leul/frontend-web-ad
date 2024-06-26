"use client";

import React from "react";
import DashBoard from "@/components/ui/dashboard/index";
import DashboardChart from "@/components/ui/dashboard/charts";

export default function Page() {
  return (
    <React.Fragment>
      <DashBoard>
        <DashboardChart />
      </DashBoard>
    </React.Fragment>
  );
};

