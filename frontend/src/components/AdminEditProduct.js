import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { TextField, MenuItem } from "@mui/material";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchdata();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 left-0 flex right-0 bottom-0 justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-auto max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg ">Edit Product</h2>
          <div
            className="w-fit ml-auto text-lg p-3 rounded-lg bg-red-100 hover:text-white hover:bg-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-4 overflow-y-auto max-h-[70vh] pb-5"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <TextField
              label="Product Name"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              required
              variant="outlined"
              sx={{ flex: 1 }} // Flex to take equal space
            />
            <TextField
              label="Brand Name"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              required
              variant="outlined"
              sx={{ flex: 1 }} // Flex to take equal space
            />
          </div>

          <TextField
            select
            label="Category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {productCategory.map((el, index) => (
              <MenuItem value={el.value} key={el.value + index}>
                {el.label}
              </MenuItem>
            ))}
          </TextField>

          <label htmlFor="uploadImageInput" className="mt-3 cursor-pointer">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex flex-col items-center">
                <FaCloudUploadAlt className="text-4xl" />
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload a product image
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <TextField
              label="Price"
              name="price"
              type="number"
              value={data.price}
              onChange={handleOnChange}
              required
              variant="outlined"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Selling Price"
              name="sellingPrice"
              type="number"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </div>

          <TextField
            label="Description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <button
            type="submit"
            className="px-3 py-2 bg-Orange text-white mb-10 hover:bg-orange-500 rounded-md"
          >
            Update 
          </button>
        </form>

        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
