import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaUsers, FaTachometerAlt, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            {/* Updated the height of the sidebar */}
            <aside className='bg-white h-[calc(100vh-65px)] w-full max-w-60 shadow-lg shadow-slate-400'>
                <div className='h-36 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaUserCircle />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold font-serif '>{user?.name}</p>
                    <p className='text-sm font-serif'>{user?.role}</p>
                </div>

                {/*** Navigation Section ***/}
                <div>   
                    <nav className='grid p-7 mt-6'>
                        <Link to={"dashboard"} className='flex items-center gap-2 px-4 py-3 font-semibold rounded-md text-Orange hover:bg-Orange hover:text-white transition-all'>
                            <FaTachometerAlt /> Dashboard
                        </Link>
                        <Link to={"all-users"} className='flex items-center gap-2 px-4 py-3 font-semibold  rounded-md text-Orange hover:bg-Orange hover:text-white transition-all'>
                            <FaUsers /> Users
                        </Link>
                        <Link to={"all-products"} className='flex items-center gap-2 px-4 py-3 font-semibold  rounded-md text-Orange hover:bg-Orange hover:text-white transition-all'>
                            <FaBoxOpen /> Products
                        </Link>
                        <Link to={"order"} className='flex items-center font-semibold gap-2 px-4 py-3 rounded-md text-Orange hover:bg-Orange hover:text-white transition-all'>
                            <FaClipboardList /> Orders
                        </Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;
