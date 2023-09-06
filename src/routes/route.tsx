import { createBrowserRouter } from "react-router-dom";

import { PATH_DETAIL, PATH_ROOT } from "../constants/path";
import Detail from "../pages/Detail";
import Main from "../pages/Main";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Main />,
  },
  {
    path: PATH_DETAIL,
    element: <Detail />,
  },
]);

export default router;
