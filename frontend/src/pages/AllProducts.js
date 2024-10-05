// import React, { useEffect, useState } from 'react'
// import UploadProduct from '../components/UploadProduct'
// import SummaryApi from '../common'
// import AdminProductCard from '../components/AdminProductCard'

// const AllProducts = () => {
//   const [openUploadProduct,setOpenUploadProduct] = useState(false)
//   const [allProduct,setAllProduct] = useState([])

//   const fetchAllProduct = async() =>{
//     const response = await fetch(SummaryApi.allProduct.url)
//     const dataResponse = await response.json()

//     console.log("product data",dataResponse)

//     setAllProduct(dataResponse?.data || [])
//   }

//   useEffect(()=>{
//     fetchAllProduct()
//   },[])

//   return (
//     <div>
//         <div className='bg-white py-2 px-4 flex justify-between items-center'>
//             <h2 className='font-bold text-lg'>All Product</h2>
//             <button  className='border-2 border-Orange text-Orange hover:bg-Orange  hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
//         </div>

//         {/**all product */}
//         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
//           {
//             allProduct.map((product,index)=>{
//               return(
//                 <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>

//               )
//             })
//           }
//         </div>

//         {/**upload prouct component */}
//         {
//           openUploadProduct && (
//             <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
//           )
//         }

//     </div>
//   )
// }

// export default AllProducts



import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleBreadcrumbClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  return (
    <div>
      {/* Breadcrumbs and Upload Product Button */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <Box
          mb={1}
          role="presentation"
          onClick={handleBreadcrumbClick}
          className="flex-1"
          sx={{ marginLeft: 2, marginTop: 3.5 }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <RouterLink
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              to="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </RouterLink>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              All Products
            </Typography>
          </Breadcrumbs>
        </Box>

        <button
          className="border-2 border-Orange text-Orange hover:bg-Orange hover:text-white transition-all py-1 px-3 rounded-full ml-4"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** All products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProduct"}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/** Upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
