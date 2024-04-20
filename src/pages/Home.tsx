import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import CarsList from "../components/CarsList";

import styles from "./Home.module.css";

function Home() {
  const { state } = useCarsContext();
  const { cars, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cars) {
    return null;
  }

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Cars</h1>
      </header>
      {/* temporal styles */}
      <nav
        style={{ height: "50px", border: "1px solid blue", marginTop: "30px" }}
      >
        navbar here
      </nav>
      <main>
        <CarsList cars={cars} />
      </main>
      <footer>footer here</footer>
    </div>
  );
}

export default Home;
