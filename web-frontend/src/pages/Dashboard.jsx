import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import MainLayout from "../components/layout/MainLayout";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/admin/DashSidebar";
import DashProfile from "../components/dashboard/admin/DashProfile";
import DashProducts from "../components/dashboard/admin/DashProducts";
import DashAddProduct from "../components/dashboard/admin/DashAddProduct";
import DashUsers from "../components/dashboard/admin/DashUsers";
import DashboardComp from "../components/dashboard/admin/DashboardComp";
import DashTransaction from "../components/dashboard/admin/DashTransaction";
import DashComments from "../components/dashboard/admin/DashComments";
import DashClientOrder from "../components/dashboard/admin/DashClientOrder";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error, accessToken } = useSelector(
    (state) => state.user
  ); // Access accessToken from the Redux store
  

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          }, // Adjust the method as needed
          // Add any required headers or options
        }
      );

      if (response.ok) {
        dispatch(signOut());
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.log(error);
      // Optionally display an error message to the user
    }
  };

  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

 

  return (
    
      <div className="min-h-screen mt-16 dark:bg-gray-900 flex flex-col md:flex-row">
      <div className='md:w-56 mt-2'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* products */}
      {tab === 'products' && <DashProducts />}
      {/*Add product*/}
      {tab === 'addproduct' && <DashAddProduct />}
      {/*All users */}
      {tab === 'users' && <DashUsers />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {/* Transaction  */}
      {tab === 'transaction' && <DashTransaction /> }
      {/* comments */}
      {tab === 'comments' && <DashComments />}
      {/*client order */}
      {tab === 'clientOrder' && <DashClientOrder />}
    </div>
    
  );
};

export default Dashboard;