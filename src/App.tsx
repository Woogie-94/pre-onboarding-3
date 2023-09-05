import { RouterProvider } from "react-router-dom";

import QueryClient from "./core/queryClient";
import router from "./routes/route";
import GlobalStyle from "./styles/globalStyle";

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
