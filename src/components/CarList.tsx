import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

import Car from "./CarListCard";
import CarListEmpty from "./CarListEmpty";

import styles from "./CarList.module.css";

function CarList() {
  const { state } = useCarsContext();
  const { cars, filteredCars } = state;

  if (filteredCars !== null && filteredCars?.length === 0)
    return <CarListEmpty />;

  return (
    <ul className={styles.CarList}>
      {(filteredCars || cars)?.map((car) => (
        <Car car={car} key={car.id} />
      ))}
    </ul>
  );
}

export default CarList;
