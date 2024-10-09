import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserFromToken } from '../redux/auth/authThunks';
import '../style/EveryPageStyle.css';
import './Navbar.css';

const NavbarComponent = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!userInfo && token) {
            dispatch(fetchUserFromToken(token));
        }
    }, [userInfo, dispatch]);

    const handleProfileClick = () => {
        if (!userInfo) {
            navigate('/login');
        } else if (userInfo.isAdmin) {
            navigate('/admin/profile');
        } else {
            navigate('/profile');
        }
    };

    return (
        <Navbar expand="lg" className="navbar-custom">
            <Navbar.Brand as={Link} to="/">
                <div>
                    <span className="navbar-brand-title">224 Adoption</span>
                    <p className="navbar-brand-subtitle">2day, 2morrow, 4ever</p>
                </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/" className="navbar-nav-link">Home</Nav.Link>
                    <Nav.Link as={Link} to="/puppies" className="navbar-nav-link">Puppies</Nav.Link>
                    <Nav.Link as={Link} to="/about" className="navbar-nav-link">About</Nav.Link>
                    <Nav.Link as={Link} to="/contact" className="navbar-nav-link">Contact</Nav.Link>
                    <Nav.Link onClick={handleProfileClick} className="navbar-nav-link"><FaUser /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
