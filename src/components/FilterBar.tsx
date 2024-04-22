import { useState } from "react";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

import styles from "./FilterBar.module.css";

import useFilters from "./useFilter";
import FilterBarMakeField from "./FilterBarMakeField";
import { Car } from "../interfaces/car";

function FilterBar() {
  const [selectedFilters, setSelectedFilters] = useState({
    make: "",
  });
  const { dispatch, actions } = useCarsContext();
  const { filterValues } = useFilters();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilters({ ...selectedFilters, make: e.target.value });

    if (e.target.value !== "All") {
      dispatch({
        type: actions.FILTER_CARS,
        payload: (car: Car) =>
          car[e.target.name as keyof typeof car] === e.target.value,
      });
    } else {
      dispatch({
        type: actions.FILTER_CARS,
        payload: () => true,
      });
    }
  };

  if (!filterValues) return null;

  return (
    <div className={styles.FilterBar} aria-label="Filter bar">
      <FilterBarMakeField
        onChange={handleFilterChange}
        value={selectedFilters.make}
        filterValues={filterValues.make}
      />
    </div>
  );
}

export default FilterBar;
