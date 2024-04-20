import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import CarsList from "../components/CarList";

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
    <div className={styles.Home}>
      <header className={styles.header}>
        <h1>Cars</h1>
      </header>
      {/* temporal styles */}
      <nav
        style={{ height: "60px", border: "1px solid blue", marginTop: "1rem" }}
      >
        navbar here
      </nav>
      <main className={styles.main}>
        <CarsList />
      </main>
      <footer>footer here</footer>
    </div>
  );
}

export default Home;
