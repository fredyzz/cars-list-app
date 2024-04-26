import { useParams } from "react-router-dom";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

import Layout from "./Layout";
import EditCarForm from "../components/EditCarForm";

import styles from "./EditCar.module.css";
import { useEffect } from "react";

function EditCar() {
  const { carId } = useParams();

  const { state, dispatch, actions } = useCarsContext();
  const { cars, selectedCar } = state;

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
        <div className={styles.EditCar}>
          <h2>Car not found</h2>
        </div>
      </Layout>
    );
  }

  if (selectedCar !== undefined) {
    return (
      <Layout>
        <div className={styles.EditCar}>
          <EditCarForm initialState={selectedCar} />
        </div>
      </Layout>
    );
  }
}

export default EditCar;
