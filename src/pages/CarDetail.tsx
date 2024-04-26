import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

import Layout from "./Layout";
import { HTTP } from "../services/http";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import { CarList } from "../interfaces/carList";
import { Car } from "../interfaces/car";
import styles from "./CarDetail.module.css";

function CarDetail() {
  const navigate = useNavigate();
  const { carId } = useParams();

  const { state, dispatch, actions } = useCarsContext();
  const {
    cars,
    selectedCar,
  }: { cars: CarList | null; selectedCar: Car | undefined } = state;

  useEffect(() => {
    if (typeof carId === "string") {
      dispatch({
        type: actions.SET_SELECTED_CAR_BY_ID,
        payload: carId,
      });
    }

    return () => dispatch({ type: actions.RESET_SELECTED_CAR });
  }, [carId, cars]); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedCar === undefined) {
    return (
      <Layout>
        <div className={styles.CarDetail}>
          <h2>Car not found</h2>
        </div>
      </Layout>
    );
  }

  const handleDeleteButtonClick = async () => {
    try {
      await HTTP.deleteCar(selectedCar.id);
      dispatch({ type: actions.DELETE_CAR, payload: selectedCar.id });
      navigate("/");
    } catch (error) {
      // Add error handling, to show a message to the user
      // dispatch a set error action and show an error message in Layout
      console.error(error);
    }
  };

  const handleEditButtonClick = () => {
    navigate(`/edit-car/${selectedCar.id}`);
  };

  if (selectedCar !== undefined) {
    return (
      <Layout>
        <div className={styles.CarDetail}>
          <h2>{`${selectedCar.make} ${selectedCar.model} details`}</h2>
          <section className={styles.information}>
            <figure className={styles.carPicture}>
              <picture>
                <source
                  srcSet="/car-placeholder.png"
                  media="(min-width: 600px)"
                />
                <img src="/car-placeholder.png" alt="Car placeholder image" />
              </picture>
              <figcaption>
                {`${selectedCar.make} ${selectedCar.model} image`}
              </figcaption>
            </figure>
            <article className={styles.carDetails} aria-label="Car information">
              <ul>
                <li>
                  <strong>Make:</strong> {selectedCar.make}
                </li>
                <li>
                  <strong>Model:</strong> {selectedCar.model}
                </li>
                <li>
                  <strong>Year:</strong> {selectedCar.year}
                </li>
                <li>
                  <strong>Color:</strong> {selectedCar.color}
                </li>
                <li>
                  <strong>Engine:</strong> {selectedCar.engine}
                </li>
                <li>
                  <strong>Transmission:</strong> {selectedCar.transmission}
                </li>
                <li>
                  <strong>Doors:</strong> {selectedCar.doors}
                </li>
              </ul>
            </article>
          </section>
          <div className={styles.actions}>
            <button
              aria-label={`Edit car with id ${selectedCar.id}`}
              onClick={handleEditButtonClick}
              role="link"
            >
              <MdEdit />
            </button>
            <button
              aria-label={`Delete car with id ${selectedCar.id}`}
              onClick={handleDeleteButtonClick}
              role="button"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CarDetail;
