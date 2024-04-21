import { useCarsContext } from "../contexts/CarsContext/useCarsContext";
import { Link, useLocation } from "react-router-dom";

import styles from "./Layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  // ToDo: Use this to change title
  const location = useLocation();
  console.log(location);

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
        <Link to={"/"}>
          <h1>GARAGE APP</h1>
        </Link>
      </header>
      {/* temporal styles */}
      <nav style={{ height: "60px", border: "1px solid blue" }}>
        navbar here
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
