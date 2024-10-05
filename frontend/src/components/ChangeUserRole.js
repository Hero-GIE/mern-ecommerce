import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole,
                name: userName,
                email: userEmail
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        } else {
            toast.error(responseData.message);
        }

        console.log("role updated", responseData);
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-40 '>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg'>

                <h1 className='pb-4 text-lg font-medium text-center'>Update User Details</h1>

                <TextField
                    label="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <div className='flex items-center justify-between my-4'>
                    <p>Role :</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => (
                                <option value={el} key={el}>{el}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='flex justify-end space-x-4 '>
                    <button
                        className='py-1 px-3 rounded bg-red-600 text-white hover:bg-red-700'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='py-1 px-3 rounded bg-blue-600 text-white hover:bg-blue-700'
                        onClick={updateUserRole}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeUserRole;
