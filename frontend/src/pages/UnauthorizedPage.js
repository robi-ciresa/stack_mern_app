import React from 'react';
import { Link } from 'react-router-dom';
import '../style/EveryPageStyle.css';

const UnauthorizedPage = () => {
    return (
        <div className="everypage-box">
            <h1>You are not authorized to perform this action</h1>
            <p>Please return to the homepage.</p>
            <Link to="/">Go back to Homepage</Link>
        </div>
    );
};

export default UnauthorizedPage;