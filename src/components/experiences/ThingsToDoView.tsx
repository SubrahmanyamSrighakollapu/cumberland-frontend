"use client";

import { useState } from "react";
import ChooseYourPaceSection from "./ChooseYourPaceSection";
import ActivitiesExplorer from "./ActivitiesExplorer";

export default function ThingsToDoView() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <>
      <ChooseYourPaceSection
        onSelectFilter={(filterKey) => setActiveFilter(filterKey)}
      />
      <ActivitiesExplorer
        activeFilter={activeFilter}
        onFilterChange={(filter) => setActiveFilter(filter)}
      />
    </>
  );
}
