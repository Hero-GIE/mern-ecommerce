import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import ChangeUserRole from '../components/ChangeUserRole';
import ConfirmDialog from '../components/ConfirmDelete'; 
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error('Failed to fetch users.');
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleDelete = (userId) => {
        setUserIdToDelete(userId);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (userIdToDelete) {
            try {
                const response = await fetch(`/api/users/${userIdToDelete}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success) {
                    toast.success('User deleted successfully.');
                    fetchAllUsers();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Failed to delete user.');
            }
        }
        setOpenConfirmDialog(false);
    };

    const columns = [
        { field: '_id', headerName: 'Id', width: 240 },
        { field: 'name', headerName: 'Name', width: 220 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'role', headerName: 'Role', width: 200 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 240,
            renderCell: (params) => moment(params.value).format('MMMM Do YYYY, h:mm:ss a')
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 230,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white'
                        onClick={() => {
                            setUpdateUserDetails(params.row);
                            setOpenUpdateRole(true);
                        }}
                    >
                        <MdModeEdit />
                    </button>

                    <button
                        className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <MdDelete />
                    </button>
                </div>
            ),
        }
    ];

    const rows = allUsers.map((user, index) => ({
        id: index + 1,
        ...user,
        createdAt: user.createdAt,
    }));

    const handleBreadcrumbClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };

    return (
    
        <div className='bg-white pb-5'>
          
            {/* Breadcrumbs */}
            <Box mb={4} role="presentation" onClick={handleBreadcrumbClick} sx={{ marginLeft: 4, marginTop: 4.5 }}>
                <Breadcrumbs aria-label="breadcrumb" >
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                 
                    <Typography
                  
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <PeopleIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
                        All Users
                    </Typography>
                </Breadcrumbs>
            </Box>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}

            <ConfirmDialog 
                open={openConfirmDialog} 
                onClose={() => setOpenConfirmDialog(false)} 
                onConfirm={confirmDelete} 
            />
        </div>

    );
};

export default AllUsers;
