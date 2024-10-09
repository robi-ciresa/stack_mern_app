import React from 'react';
import ManageAdoptions from '../components/ManageAdoptions';
import ManagePuppies from '../components/ManagePuppies';
import ManageVolunteers from '../components/ManageVolunteers';
import Logout from '../components/Logout';
import '../style/EveryPageStyle.css'

const AdminProfile = () => {
    return (
        <div className="everypage-box">
            <h2>Admin Profile</h2>

            <ManageAdoptions />
            <ManagePuppies />
            <ManageVolunteers />
            
            <Logout />
        </div>
    );
};

export default AdminProfile;
