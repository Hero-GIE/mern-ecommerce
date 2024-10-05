import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import SearchProduct from "../pages/SearchProduct";
import Cart from "../pages/Cart";
import Dashboard from "../pages/DashBoard";
// import Order from "../pages/Order";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import { OrderPage } from "../pages/OrderPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "sign-up",
        element: <SignUp />,
      },

      {
        path: "product-category",
        element: <CategoryProduct />,
      },

      {
        path: "product/:id",
        element: <ProductDetails />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "success",
        element: <Success />,
      },

      {
        path: "cancel",
        element: <Cancel />,
      },

      
      {
        path: "order",
        element: <OrderPage />,
      },
    
      {
        path: "search",
        element: <SearchProduct />,
      },

      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          }, 
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          // {
          //   path: "order",
          //   element: <Order />,
          // },
    
        ],
      },
    ],
  },
]);

export default router;
