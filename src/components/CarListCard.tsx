import { Car as CarInterface } from "../interfaces/car";
import styles from "./CarListCard.module.css";

interface CarProps {
  car: CarInterface;
}

function CarListCard({ car }: CarProps) {
  return (
    <article className={styles.CarListCard}>
      <header>
        <h2>{car.make}</h2>
      </header>
      <section>
        <p>
          <strong>Model:</strong> {car.model}
        </p>
        <p>
          <strong>Year:</strong> {car.year}
        </p>
      </section>
    </article>
  );
}

export default CarListCard;
