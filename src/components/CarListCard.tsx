import { Car as CarInterface } from "../interfaces/car";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import styles from "./CarListCard.module.css";
import { HTTP } from "../services/http";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

interface CarProps {
  car: CarInterface;
}

function CarListCard({ car }: CarProps) {
  const navigate = useNavigate();
  const { dispatch, actions } = useCarsContext();

  const handleDeleteButtonClick = async () => {
    try {
      await HTTP.deleteCar(car.id);
      dispatch({ type: actions.DELETE_CAR, payload: car.id });
    } catch (error) {
      // Add error handling, to show a message to the user
      // dispatch a set error action and show an error message in Layout
      console.error(error);
    }
  };

  const handleEditButtonClick = () => {
    navigate(`/edit-car/${car.id}`);
  };

  return (
    <article className={styles.CarListCard}>
      <div className={styles.content}>
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
      </div>
      <div className={styles.actions}>
        <button
          aria-label={`Edit car with id ${car.id}`}
          onClick={handleEditButtonClick}
          role="button"
        >
          <MdEdit />
        </button>
        <button
          aria-label={`Delete car with id ${car.id}`}
          onClick={handleDeleteButtonClick}
          role="button"
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}

export default CarListCard;
