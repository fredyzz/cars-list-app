import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

import Navbar from "../components/Navbar";

import styles from "./Layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useCarsContext();
  const { loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.Layout}>
      <header className={styles.header}>
        <Navbar />
      </header>
      {/* temporal styles */}
      <div style={{ height: "60px", border: "1px solid blue" }}>filters</div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
