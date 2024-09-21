import './App.css';
import './routes/layout/layout.scss';
import Home from './routes/home/Home';
import List from './routes/list/List';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './routes/layout/Layout';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/list",
        element: <List />
      }
    ]
  },

]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
