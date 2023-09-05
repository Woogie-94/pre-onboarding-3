import { RouterProvider } from "react-router-dom";

import QueryClient from "./core/queryClient";
import GlobalStyle from "./globalStyle";
import router from "./routes/route";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  );
}

export default App;
