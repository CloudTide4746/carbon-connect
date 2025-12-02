/** @format */

import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./Router";
import ProjectRuzhu from "./components/platform/ProjectRuzhu";

function App() {
  return (
    <>
      <Toaster position='top-center' richColors />
      <ProjectRuzhu />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
