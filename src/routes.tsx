import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Navigate, RouteObject } from "react-router-dom";

import HomePage from "./pages/Home";
import AddCarPage from "./pages/AddCar";

export interface routes {
  icon?: IconType;
  label: string;
  path: string;
  element: React.ReactNode;
}

// Add here new routes
export const routesConfig: routes[] = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
    icon: FaHome,
  },
  {
    path: "/add-car",
    element: <AddCarPage />,
    label: "Add Car",
    icon: IoIosAddCircle,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
    label: "Default",
  },
];

export const publicRoutes = (): RouteObject[] =>
  routesConfig.map((route) => ({ path: route.path, element: route.element }));
