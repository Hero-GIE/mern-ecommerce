import React, { useEffect, useState } from 'react';
import image1 from '../asset/banner/img1.webp';
import image2 from '../asset/banner/img2.webp';
import image3 from '../asset/banner/img3.jpg';
import image4 from '../asset/banner/img4.jpg';
import image5 from '../asset/banner/img5.webp';

import image1Mobile from '../asset/banner/img1_mobile.jpg';
import image2Mobile from '../asset/banner/img2_mobile.webp';
import image3Mobile from '../asset/banner/img3_mobile.jpg';
import image4Mobile from '../asset/banner/img4_mobile.jpg';
import image5Mobile from '../asset/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image3, image4, image5];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage((prev) => prev + 1);
        }
    };

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-52 md:h-72 w-full relative">
                {/** Navigation buttons */}
                <div className="absolute z-20 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={preveImage} className="bg-Orange text-white shadow-md rounded-full p-2">
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className="bg-Orange text-white shadow-md rounded-full p-2">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/** Dark overlay */}
                <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50 z-10"></div>

                {/** Desktop and tablet version */}
                <div className="hidden md:flex h-full w-full overflow-hidden relative">
                    {desktopImages.map((imageURl, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-transform duration-1000 ease-in-out"
                            key={imageURl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURl} className="w-full h-full object-cover" alt={`Banner ${index}`} />
                        </div>
                    ))}
                </div>

                {/** Mobile version */}
                <div className="flex h-full w-full overflow-hidden md:hidden relative">
                    {mobileImages.map((imageURl, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-transform duration-1000 ease-in-out"
                            key={imageURl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURl} className="w-full h-full object-cover" alt={`Banner ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
