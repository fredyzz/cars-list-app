import { Navigate, RouteObject } from "react-router-dom";

import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import HomePage from "./pages/Home";
import AddCarPage from "./pages/AddCar";
import EditCarPage from "./pages/EditCar";
import CarDetail from "./pages/CarDetail";

export interface routes {
  icon?: IconType;
  label: string;
  path: string;
  element: React.ReactNode;
  notVisible?: boolean;
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
    path: "/car/:carId",
    element: <CarDetail />,
    label: "Car Detail",
    icon: FaCarAlt,
    notVisible: true,
  },
  {
    path: "/add-car",
    element: <AddCarPage />,
    label: "Add Car",
    icon: IoIosAddCircle,
  },
  {
    path: "/edit-car/:carId",
    element: <EditCarPage />,
    label: "Edit Car",
    icon: MdEdit,
    notVisible: true,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
    label: "Default",
  },
];

export const publicRoutes = (): RouteObject[] =>
  routesConfig.map((route) => ({ path: route.path, element: route.element }));
