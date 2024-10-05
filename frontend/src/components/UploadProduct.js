import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Effect to manage body overflow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className='fixed w-full h-full bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-lg p-3 rounded-lg bg-red-100 hover:text-white hover:bg-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 max-h-[70vh] overflow-y-auto  pb-5' onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <TextField
              label="Product Name"
              variant="outlined"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              required
              fullWidth
              sx={{ mb: 2 }} // Adjust spacing here
            />
            <TextField
              label="Brand Name"
              variant="outlined"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              required
              fullWidth
              sx={{ mb: 2 }} // Adjust spacing here
            />
          </div>

          <TextField
            select
            label="Category"
            variant="outlined"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            required
            fullWidth
            sx={{ mb: 2 }} // Adjust spacing here
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {productCategory.map((el, index) => (
              <MenuItem value={el.value} key={el.value + index}>
                {el.label}
              </MenuItem>
            ))}
          </TextField>

          <label htmlFor='uploadImageInput' className='mt-3 cursor-pointer'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div className='absolute bottom-0 right-0 p-1 text-white bg-Orange rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )}
          </div>

          <div className="flex gap-2">
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              required
              fullWidth
              sx={{ mb: 2 }} // Adjust spacing here
            />
            <TextField
              label="Selling Price"
              variant="outlined"
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
              fullWidth
              sx={{ mb: 2 }} // Adjust spacing here
            />
          </div>

          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            name="description"
            value={data.description}
            onChange={handleOnChange}
            fullWidth
            sx={{ mb: 2 }} // Adjust spacing here
          />
          
          <button className='px-3 py-2 bg-Orange text-white mb-10 hover:bg-orange-500 rounded-md'>Upload Product</button>
        </form>

        {openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
