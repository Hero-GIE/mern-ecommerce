import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import displayGHSCurrency from '../helpers/displayCurrency';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollTo({
            left: scrollElement.current.scrollLeft + 300,
            behavior: 'smooth',
        });
    };

    const scrollLeft = () => {
        scrollElement.current.scrollTo({
            left: scrollElement.current.scrollLeft - 300,
            behavior: 'smooth',
        });
    };

    return (
        <div className='container mx-auto px-4 my-5 relative '>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-hidden '>
                <button
                    className='bg-Orange text-white shadow-md rounded-full p-2 absolute left-0 text-lg z-50 hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-Orange text-white shadow-md rounded-full p-2 absolute right-0 text-lg z-50 hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                <div className='flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all p-3' ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex '>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-Orange font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <Link to={"product/" + product?._id} key={product?._id} className='flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-xl shadow-lg shadow-gray-500 '>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='p-4 grid '>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black '>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-Orange font-medium text-sm'>{displayGHSCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through text-sm'>{displayGHSCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-Orange hover:bg-darkOrange text-white px-3 py-1 rounded-full '  onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
