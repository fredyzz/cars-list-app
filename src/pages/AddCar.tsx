import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import Layout from "./Layout";
import AddCarForm from "../components/AddCarForm";

import styles from "./AddCar.module.css";

function AddCar() {
  const { state } = useCarsContext();
  const { cars } = state;

  if (!cars) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.AddCar}>
        <AddCarForm />
      </div>
    </Layout>
  );
}

export default AddCar;
