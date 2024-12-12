import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
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
import { Loading } from "./Components/UI/Loading";

const App = () => {
  const GeneralUrl = "http://localhost:2081/nbgs/";
  const productsUrl = `${GeneralUrl}products`;
  const adminUrl = `${GeneralUrl}admindetail`;
  const [itemLists, setItemLists] = useState();
  const [adminDetail, setAdminDetail] = useState();
  useEffect(() => {
    axios
      .get(productsUrl)
      .then((result) => {
        setItemLists(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(adminUrl)
      .then((result) => {
        setAdminDetail(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (adminDetail) {
    // console.log(itemLists);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout adminDetail={adminDetail} itemLists={itemLists} />,
        errorElement: <ErrPage />,

        children: [
          {
            path: "/",
            element: (
              <Home
                itemLists={itemLists}
                adminDetail={adminDetail}
                productsUrl={productsUrl}
              />
            ),
          },
          {
            path: "/product/:id",
            element: itemLists ? (
              <Product itemLists={itemLists} productsUrl={productsUrl} />
            ) : (
              <Loading />
            ),
          },
          {
            path: "/contact",
            element: <Contact adminDetail={adminDetail} />,
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
            element: (
              <Cart
                adminDetail={adminDetail}
                GeneralUrl={GeneralUrl}
                adminUrl={adminUrl}
              />
            ),
          },
        ],
      },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
  }
};
export default App;
