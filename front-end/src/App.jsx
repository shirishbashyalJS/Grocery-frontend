import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { FaCartPlus } from "react-icons/fa";
import { Home } from "./Pages/Home";
import { Contact } from "./Pages/Contact";
import { Login } from "./Pages/Login";
import { Layout } from "./Components/Layout/Layout";
import { ErrPage } from "./Pages/ErrPage";
import { Product } from "./Components/UI/Product";
import itemLists from "./API/Items.json";
import { Cart } from "./Pages/Cart";
import { Signin } from "./Pages/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrPage />,

    children: [
      {
        path: "/",
        element: <Home itemLists={itemLists} />,
      },
      {
        path: "/product/:id",
        element: <Product itemLists={itemLists} />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
