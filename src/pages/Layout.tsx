import { useLocation } from "react-router-dom";
import { useCarsContext } from "../contexts/CarsContext/useCarsContext";

import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";

import styles from "./Layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { state } = useCarsContext();
  const { loading, error } = state;

  const isHome = pathname === "/";

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
      {isHome && <FilterBar />}
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
