import React from 'react'
import CancelImage from '../asset/cancel.gif'
import { Link } from 'react-router-dom'
const Cancel = () => {
    return (
        <div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-1'>
            <img src={CancelImage}
            width={230}
            height={230}
            className='mix-blend-multiply'
            />
            <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
            <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go to cart</Link>
    
        </div>
      )
}

export default Cancel