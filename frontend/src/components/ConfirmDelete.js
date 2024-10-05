import React from 'react';
import deleteImage from '../asset/delete.png'
const ConfirmDialog = ({ open, onClose, onConfirm }) => {
    if (!open) return null;

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
            <div className='bg-white p-4 rounded-lg shadow-md' style={{ height: '200px', width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className='flex flex-col items-center text-center'>
                <img
                        src={deleteImage} 
                        alt="Confirmation" 
                        style={{ width: '100px', height: 'auto' }} // Adjust the width as needed
                    />
                    <p>Are you sure you want to delete this user?</p>
                </div>

                <div className='flex justify-end space-x-4'>
                    <button 
                        className='py-1 px-3 rounded bg-blue-600 text-white hover:bg-blue-700'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className='py-1 px-3 rounded bg-red-600 text-white hover:bg-red-700'
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
