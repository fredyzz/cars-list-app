import cx from "classnames";
import { Link, useLocation } from "react-router-dom";

import { routesConfig } from "../routes";

import styles from "./Navbar.module.css";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.Navbar} aria-label="Main Navigation">
      <Link to={"/"} className={styles.logo} aria-label="App logo">
        <h1>GARAGE APP</h1>
      </Link>
      {routesConfig.map((route) => {
        if (route.path !== "*" && !route.notVisible) {
          return (
            <Link
              to={route.path}
              key={route.path}
              role="menuitem"
              aria-current={pathname === route.path ? "page" : undefined}
              className={cx(styles.link, {
                [styles.activeLink]: pathname === route.path,
              })}
            >
              {route.icon && (
                <span className={styles.routeIcon}>
                  <route.icon />
                </span>
              )}
              {route.label}
            </Link>
          );
        }
      })}
    </nav>
  );
}

export default Navbar;
