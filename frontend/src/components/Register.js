import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/EveryPageStyle.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.auth);
    const { loading, error, userInfo } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            dispatch(registerUser({ name, email, password }));
        }
    };

    if (userInfo) {
        navigate('/');
    }

    return (
        <div className="everypage-box">
            <h2>Registration</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="small-margin">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="small-margin">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="small-margin">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="small-margin">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary small-margin" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Go to login</Link>
            </p>
        </div>
    );
};

export default Register;