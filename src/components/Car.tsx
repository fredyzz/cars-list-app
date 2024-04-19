import { Car as CarInterface } from "../interfaces/car";

interface CarProps {
  car: CarInterface;
}

function Car({ car }: CarProps) {
  return (
    <div>
      <h2>{car.make}</h2>
      <p>{car.model}</p>
      <p>{car.year}</p>
    </div>
  );
}

export default Car;
