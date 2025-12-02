/** @format */

import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./Router";

function App() {
  return (
    <>
      <Toaster position='top-center' richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
