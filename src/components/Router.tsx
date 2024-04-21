import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "../routes";

export function Router() {
  const router = createBrowserRouter([...publicRoutes()]);

  return router ? <RouterProvider router={router} /> : null;
}
