import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center z-40 '>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4  shadow-slate-400'>
        <div className='w-fit ml-auto text-lg p-3 rounded-lg bg-red-100 hover:text-white hover:bg-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-72 h-72'/>
                </div>
        </div>
    </div>
  )
}

export default DisplayImage