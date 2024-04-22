import { useEffect, useState } from "react";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

const FILTER_KEYS = ["make"];
const NOT_SELECTED_VALUE = "All";

interface FilterValues {
  make: string[];
}

function useFilters() {
  const [filterValues, setFilterValues] = useState<FilterValues | undefined>(
    undefined
  );
  const { state } = useCarsContext();
  const { cars } = state;

  const getFilterValues = (): FilterValues | undefined => {
    if (!cars || cars.length === 0) return undefined;

    const filterValues: { make: string[] } = cars.reduce<{
      make: string[];
    }>(
      (acc, car) => {
        acc.make = [
          ...new Set([NOT_SELECTED_VALUE, ...[...acc.make, car.make].sort()]),
        ];

        return acc;
      },
      { make: [] }
    );
    return filterValues;
  };

  useEffect(() => {
    if (cars && cars.length > 0) {
      setFilterValues(getFilterValues());
    }
  }, [cars]); // eslint-disable-line react-hooks/exhaustive-deps

  return { filterKeys: FILTER_KEYS, filterValues: filterValues };
}

export default useFilters;
