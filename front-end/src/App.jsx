import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { FaCartPlus } from "react-icons/fa";
import { Home } from "./Pages/Home";
import { Contact } from "./Pages/Contact";
import { Login } from "./Pages/Login";
import { Layout } from "./Components/Layout/Layout";
import { ErrPage } from "./Pages/ErrPage";
import { Product } from "./Components/UI/Product";
import { Cart } from "./Pages/Cart";
import { Signin } from "./Pages/Signin";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const productsUrl = "http://localhost:2081/newbashyalgeneralstore/products";
  const [itemLists, setItemLists] = useState();
  useEffect(() => {
    axios
      .get(productsUrl)
      .then((result) => {
        setItemLists(
          Object.fromEntries(
            Object.entries(result.data[0]).filter(([key]) => {
              return key != "_id";
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (itemLists) {
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

    return <RouterProvider router={router}></RouterProvider>;
  }
};
export default App;
