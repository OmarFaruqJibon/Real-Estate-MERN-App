import "./App.css";
import "./routes/layout/layout.scss";
import Home from "./routes/home/Home";
import List from "./routes/list/List";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, AuthenticatedLayout } from "./routes/layout/Layout";
import Property from "./routes/property/Property";
import Profile from "./routes/profile/Profile";
import About from "./routes/about/About";
import Contact from "./routes/contact/Contact";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import UpdateProfile from "./routes/updateProfile/UpdateProfile";
import AddPost from "./routes/addPost/AddPost";
import { listPageLoader, profileLoader, propertyLoader } from "./lib/loader";
import Chatting from "./routes/chatting.js/Chatting";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard";
import AdminLayout from "./routes/adminDashboard/AdminLayout";
import AdminUsers from "./routes/adminDashboard/AdminUsers";
import AdminProperties from "./routes/adminDashboard/AdminProperties";
import PendingProperties from "./routes/adminDashboard/PendingProperties";
import RejectedProperties from "./routes/adminDashboard/RejectedProperties";
import UserLayout from "./routes/userDashboard/UserLayout";
import UserProfile from "./routes/userDashboard/UserProfile";
import UserPosts from "./routes/userDashboard/UserPosts";
import EditPost from "./routes/userDashboard/EditPost";
import PublicUserProfile from "./routes/PublicUserProfile/PublicUserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <List />,
        loader: listPageLoader,
      },
      {
        path: "/list/:id",
        element: <Property />,
        loader: propertyLoader,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/unauthorized",
        element: (
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            403 - You are not authorized to access this page.
          </h1>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "/profile/update",
        element: (
          <PrivateRoute allowedRoles={["NORMAL", "DEVELOPER", "ADMIN"]}>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/addPost",
        element: (
          <PrivateRoute allowedRoles={["NORMAL", "DEVELOPER", "ADMIN"]}>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/chats",
        element: (
          <PrivateRoute allowedRoles={["NORMAL", "DEVELOPER", "ADMIN"]}>
            <Chatting />
          </PrivateRoute>
        ),
        loader: profileLoader,
      },
      {
        path: "/profile/:userId",
        element: <PublicUserProfile />,
      },

      // ADMIN DASHBOARD ROUTE
      {
        path: "/admin",
        element: (
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "overview",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "properties",
            element: <AdminProperties />,
          },
          {
            path: "pending",
            element: <PendingProperties />,
          },
          {
            path: "rejected",
            element: <RejectedProperties />,
          },
        ],
      },

      // USER DASHBOARD ROUTE
      {
        path: "/dashboard",
        element: (
          <PrivateRoute allowedRoles={["NORMAL", "DEVELOPER", "ADMIN"]}>
            <UserLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "profile", element: <Profile /> },
          { path: "posts", element: <UserPosts /> },
          {
            path: "/dashboard/edit/:postId",
            element: <EditPost />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
