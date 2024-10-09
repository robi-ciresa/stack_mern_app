import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromToken } from './redux/auth/authThunks'; 
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PuppyList from './pages/PuppyList';
import PuppyDetail from './pages/PuppyDetail';
import Homepage from './pages/Homepage';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); 
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserFromToken());
    }
  }, [dispatch, token]);

  return ( 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/puppies" element={<PuppyList />} />
        <Route path="/puppies/:id" element={<PuppyDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactsPage />} />

        <Route 
          path="/profile" 
          element={
            userInfo ? (
              userInfo.isAdmin ? <Navigate to="/admin/profile" /> : <UserProfile />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/profile" 
          element={
            userInfo && userInfo.isAdmin ? <AdminProfile /> : <Navigate to="/unauthorized" />
          } 
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;