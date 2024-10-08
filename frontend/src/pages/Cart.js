// import React, { useContext, useEffect, useState } from "react";
// import SummaryApi from "../common";
// import Context from "../context";
// import displayGHSCurrency from "../helpers/displayCurrency";
// import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";

// const Cart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const context = useContext(Context);
//   const loadingCart = new Array(4).fill(null);

//   const fetchData = async () => {
//     const response = await fetch(SummaryApi.addToCartProductView.url, {
//       method: SummaryApi.addToCartProductView.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       setData(responseData.data);
//     }
//   };

//   const handleLoading = async () => {
//     await fetchData();
//   };

//   useEffect(() => {
//     setLoading(true);
//     handleLoading();
//     setLoading(false);
//   }, []);

//   const increaseQty = async (id, qty) => {
//     const response = await fetch(SummaryApi.updateCartProduct.url, {
//       method: SummaryApi.updateCartProduct.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         _id: id,
//         quantity: qty + 1,
//       }),
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       fetchData();
//     }
//   };

//   const decraseQty = async (id, qty) => {
//     if (qty >= 2) {
//       const response = await fetch(SummaryApi.updateCartProduct.url, {
//         method: SummaryApi.updateCartProduct.method,
//         credentials: "include",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           _id: id,
//           quantity: qty - 1,
//         }),
//       });

//       const responseData = await response.json();

//       if (responseData.success) {
//         fetchData();
//       }
//     }
//   };

//   const deleteCartProduct = async (id) => {
//     const response = await fetch(SummaryApi.deleteCartProduct.url, {
//       method: SummaryApi.deleteCartProduct.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         _id: id,
//       }),
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       fetchData();
//       context.fetchUserAddToCart();
//       toast.success(responseData.message);
//     } else {
//       toast.error(responseData.message);
//     }
//   };

//   const handlePayment = async () => {
//     const stripePromise = await loadStripe(
//       process.env.REACT_APP_STRIPE_PUBLIC_KEY
//     );

//     const response = await fetch(SummaryApi.payment.url, {
//       method: SummaryApi.payment.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({ cartItems: data }),
//     });

//     const responseData = await response.json();
//     if (responseData?.id) {
//       stripePromise.redirectToCheckout({ sessionId: responseData.id });
//     }
//     console.log("Payment response", responseData);
//   };

//   const totalQty = data.reduce(
//     (previousValue, currentValue) => previousValue + currentValue.quantity,
//     0
//   );

//   const totalPrice = data.reduce(
//     (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
//     0
//   );
//   return (
//     <div className="container mx-auto">
//       <div className="text-center text-lg my-3">
//         {data.length === 0 && !loading && (
//           <p className="bg-white py-5">No Data</p>
//         )}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4 shadow-lg shadow-slate-">
//         {/***view product */}
//         <div className="w-full max-w-3xl ">
//           {loading
//             ? loadingCart?.map((el, index) => {
//                 return (
//                   <div
//                     key={el + "Add To Cart Loading" + index}
//                     className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
//                   ></div>
//                 );
//               })
//             : data.map((product, index) => {
//                 return (
//                   <div
//                     key={product?._id + "Add To Cart Loading"}
//                     className="w-full bg-white h-32 my-4 border border-slate-300  rounded grid grid-cols-[128px,1fr] shadow-md shadow-slate-400"
//                   >
//                     <div className="w-32 h-32 bg-slate-200">
//                       <img
//                         src={product?.productId?.productImage[0]}
//                         className="w-full h-full object-scale-down mix-blend-multiply "
//                       />
//                     </div>
//                     <div className="px-4 py-2 relative">
//                       {/**delete product */}
//                       <div
//                         className="absolute right-0  bg-red-100 rounded-full p-2 m-1 hover:bg-red-600 hover:text-white cursor-pointer"
//                         onClick={() => deleteCartProduct(product?._id)}
//                       >
//                         <MdDelete />
//                       </div>

//                       <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
//                         {product?.productId?.productName}
//                       </h2>
//                       <p className="capitalize text-slate-500">
//                         {product?.productId.category}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-Orange font-medium text-lg">
//                           {displayGHSCurrency(product?.productId?.sellingPrice)}
//                         </p>
//                         <p className="text-slate-600 font-semibold text-lg">
//                           {displayGHSCurrency(
//                             product?.productId?.sellingPrice * product?.quantity
//                           )}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-3 mt-1">
//                         <button
//                           className="border border-Orange text-Orange hover:bg-Orange hover:text-white w-6 h-6 flex justify-center items-center rounded "
//                           onClick={() =>
//                             decraseQty(product?._id, product?.quantity)
//                           }
//                         >
//                           -
//                         </button>
//                         <span>{product?.quantity}</span>
//                         <button
//                           className="border border-Orange text-Orange hover:bg-Orange hover:text-white w-6 h-6 flex justify-center items-center rounded "
//                           onClick={() =>
//                             increaseQty(product?._id, product?.quantity)
//                           }
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//         </div>

//         {/***summary  */}
//         {data[0] && (
//           <div className="mt-5 lg:mt-0 w-full max-w-sm">
//             {loading ? (
//               <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
//             ) : (
//               <div className="bg-slate-50 p-4 rounded shadow-md">
//                 <h2 className="text-white bg-Orange px-4 py-1 rounded">
//                   Summary
//                 </h2>
//                 <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 mt-4">
//                   <p>Quantity</p>
//                   <p>{totalQty}</p>
//                 </div>

//                 <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
//                   <p>Total Price</p>
//                   <p>{displayGHSCurrency(totalPrice)}</p>
//                 </div>

//                 <button
//                   className="bg-Orange p-2 text-white w-full mt-4 rounded transition-transform transform hover:scale-105"
//                   onClick={handlePayment}
//                 >
//                   Payment
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayGHSCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({cartItems: data}),
    })

    const responseData = await response.json()
    if(responseData?.id){
      stripePromise.redirectToCheckout({sessionId : responseData.id})
    }
    console.log("Payment response", responseData)
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      {/** Main Flex Container for Product List and Summary */}
      <div className="flex flex-col lg:flex-row lg:gap-10 lg:justify-between">
        {/*** Product List */}
        <div className="w-full lg:w-2/3 overflow-y-auto max-h-[75vh]">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-4 border border-slate-300  rounded grid grid-cols-[128px,1fr] shadow-md shadow-slate-400"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply "
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0  bg-red-100 rounded-full p-2 m-1 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-Orange font-medium text-lg">
                          {displayGHSCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayGHSCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-Orange text-Orange hover:bg-Orange hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-Orange text-Orange hover:bg-Orange hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/*** Summary Section */}
        {data[0] && (
          <div className="w-full lg:w-1/3 lg:max-w-sm lg:sticky lg:top-0">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="bg-slate-50 p-4 rounded shadow-md">
                <h2 className="text-white bg-Orange px-4 py-1 rounded">
                  Summary
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 mt-4">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayGHSCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-Orange p-2 text-white w-full mt-4 rounded transition-transform transform hover:scale-105"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
