import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import Layout from "./Layout";
import CarsList from "../components/CarList";

import styles from "./Home.module.css";

function Home() {
  const { state } = useCarsContext();
  const { cars } = state;

  if (!cars) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.Home}>
        <CarsList />
      </div>
    </Layout>
  );
}

export default Home;
