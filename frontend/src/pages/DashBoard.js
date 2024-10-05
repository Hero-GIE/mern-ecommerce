import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Breadcrumbs, Link, Box } from '@mui/material';
import { toast } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';

import SummaryApi from '../common'; // Example import for API
import { FaTachometerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setTotalUsers(data.data.length);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch total users.');
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const data = await response.json();
      if (data.data) {
        setTotalProducts(data.data.length);
      } else {
        toast.error('Failed to fetch products.');
      }
    } catch (error) {
      toast.error('Failed to fetch total products.');
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await fetch(SummaryApi.allOrders.url);
      const data = await response.json();
      if (data.success) {
        setTotalOrders(data.data);
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      toast.error('Failed to fetch total orders.');
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalProducts();
    fetchTotalOrders();
  }, []);

  const handleBreadcrumbClick = (event) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  return (
    <Box p={4}>
      {/* Breadcrumbs */}
      <Box mb={4} role="presentation" onClick={handleBreadcrumbClick}>
        <Breadcrumbs aria-label="breadcrumb">
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
            sx={{  display: 'flex', alignItems: 'center' }}
          >
            <FaTachometerAlt className='text-slate-500 m-2'  fontSize="inherit" />
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Dashboard Cards */}
      <Box
        display='grid'
        gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
      >
        <Card sx={{ backgroundColor: 'rgba(139, 0, 0, 0.9)', color: 'white', minHeight: '200px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="150px">
              <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '1.5rem' }}>
                Total Users
              </Typography>
              <Typography variant="h2" component="div" sx={{ fontSize: '3rem' }}>
                {totalUsers}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: 'rgba(184, 134, 11, 0.9)', color: 'white', minHeight: '200px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="150px">
              <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '1.5rem' }}>
                Total Products
              </Typography>
              <Typography variant="h2" component="div" sx={{ fontSize: '3rem' }}>
                {totalProducts}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: 'rgba(0, 100, 0, 0.9)', color: 'white', minHeight: '200px' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="150px">
              <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '1.5rem' }}>
                Total Orders
              </Typography>
              <Typography variant="h2" component="div" sx={{ fontSize: '3rem' }}>
                {totalOrders}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
