import { CarList as CarListInterface } from "../interfaces/carList";

import Car from "./Car";

interface CarsProps {
  cars: CarListInterface;
}

function CarsList({ cars }: CarsProps) {
  return (
    <ul>
      {cars.map((car) => (
        <Car car={car} key={car.id} />
      ))}
    </ul>
  );
}

export default CarsList;
