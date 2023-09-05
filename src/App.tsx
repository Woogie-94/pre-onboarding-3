import { RouterProvider } from "react-router-dom";

import GlobalStyle from "./globalStyle";
import router from "./routes/route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  );
}

export default App;
