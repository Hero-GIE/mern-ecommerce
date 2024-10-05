import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  //fetch user details from cookie(JWT)
  const fetchUserDetails = async () => {
    const responseData = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const response = await responseData.json();

    if (response.success) {
      dispatch(setUserDetails(response.data));
    }

    console.log("data-user", responseData);
  };
  
  const fetchUserAddToCart = async () => {
    const responseData = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await responseData.json();

    // console.log("dataApi", dataApi); 
    setCartProductCount(dataApi?.data?.count)
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user details fetch
          cartProductCount ,// current user add to cart product count
          fetchUserAddToCart
        }}
      >
        <ToastContainer
        position="top-center"
        />

        <Header />
        <main className="flex flex-col min-h-[calc(100vh-110px)] justify-center pt-16">
          {/* The Outlet will be rendered here */}
          <div className="flex-grow">
            <Outlet />
          </div>
        </main>
        {/* <Footer /> */}
      </Context.Provider>  
    </>
  );
}

export default App;
