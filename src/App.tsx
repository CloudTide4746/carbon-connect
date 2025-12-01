import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Platform from './pages/Platform';
import FeaturesPage from './pages/FeaturesPage';
import ThemesPage from './pages/ThemesPage';
import DigitalHumanPage from './pages/DigitalHumanPage';

// Simulate network delay to demonstrate loading state
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => { await delay(70); return null; }
      },
      {
        path: "features",
        element: <FeaturesPage />,
        loader: async () => { await delay(125); return null; }
      },
      {
        path: "themes",
        element: <ThemesPage />,
        loader: async () => { await delay(125); return null; }
      },
      {
        path: "digital-human",
        element: <DigitalHumanPage />,
        loader: async () => { await delay(100); return null; }
      },
      {
        path: "platform",
        element: <Platform />,
        loader: async () => { await delay(100); return null; }
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
