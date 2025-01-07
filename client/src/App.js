import './App.css';
import './routes/layout/layout.scss';
import Home from './routes/home/Home';
import List from './routes/list/List';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout, AuthenticatedLayout } from './routes/layout/Layout';
import Property from './routes/property/Property';
import Profile from './routes/profile/Profile';
import About from './routes/about/About';
import Contact from './routes/contact/Contact';
import Register from './routes/register/Register';
import Login from './routes/login/Login';
import UpdateProfile from './routes/updateProfile/UpdateProfile';
import AddPost from './routes/addPost/AddPost';
import { listPageLoader, profileLoader, propertyLoader } from './lib/loader';


const router = createBrowserRouter([

  { //Normal user can see these routes
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/list",
        element: <List />,
        loader: listPageLoader
      },
      {
        path: "/:id",
        element: <Property />,
        loader: propertyLoader
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  { //Only registered users can see these routes
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader
      },
      {
        path: "/profile/update",
        element: <UpdateProfile />
      },
      {
        path: "/addPost",
        element: <AddPost />
      },
    ]
  }

]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
