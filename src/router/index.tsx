import { createHashRouter } from "react-router-dom";

import App from "@/App";
import ListPage from "@/pages/ListPage";
import MapPage from "@/pages/MapPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MapPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <></>,
  },
]);

export default router;
