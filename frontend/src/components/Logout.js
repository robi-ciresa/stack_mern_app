import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import '../style/EveryPageStyle.css'

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                navigate('/'); 
            });
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger small-margin">
            Logout
        </button>
    );
};

export default Logout;