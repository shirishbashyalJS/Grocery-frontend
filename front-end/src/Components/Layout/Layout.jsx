import { Outlet } from "react-router-dom";
import { Header } from "../UI/Header";
import { Footer } from "../UI/Footer";
import { createContext, useContext, useEffect, useState } from "react";


const LoginContext = createContext();
const CartContext = createContext();
const UserContext = createContext();
const AdminContext = createContext();
export const Layout = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [admin, setAdmin] = useState(() => {
    return (
      user.email == "shirishbashyal2@gmail.com" && user.password == "Shirish.@1"
    );
  });
  const [searchValue, setSearchValue] = useState(null);
  const [login, setLogin] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // console.log(storedUser);
    if (storedUser) return storedUser.email ? true : false;
    else return false;
  });
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    console.log("admin:" + admin);
    // console.log(login);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    // console.log(user);
    setAdmin(
      user.email == "shirishbashyal2@gmail.com" && user.password == "Shirish.@1"
    );
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <UserContext.Provider value={{ user, setUser }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <Header setSearchValue={setSearchValue} />
              <Outlet context={{ searchValue }} />
              <Footer />
            </LoginContext.Provider>
          </CartContext.Provider>
        </UserContext.Provider>
      </AdminContext.Provider>
    </>
  );
};
export const useCart = () => useContext(CartContext);
export const useLogin = () => useContext(LoginContext);
export const useUser = () => useContext(UserContext);
export const useAdmin = () => useContext(AdminContext);
