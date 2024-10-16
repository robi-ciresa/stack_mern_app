import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AdoptForm from '../components/AdoptForm';
import { fetchUserFromToken } from '../redux/auth/authThunks';
import '../style/EveryPageStyle.css';

const PuppyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const { puppies } = useSelector((state) => state.puppies);
    const { userInfo } = useSelector((state) => state.auth);

    const [showAdoptForm, setShowAdoptForm] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!userInfo && token) {
            dispatch(fetchUserFromToken(token));
        }
    }, [userInfo, dispatch]);

    const puppy = puppies.find((p) => p._id === id);

    const handleDistanceAdoption = async () => {
        if (userInfo) {
            const confirmAdoption = window.confirm(
                'By starting a distance adoption, you will automatically contribute 10 euros per week. Do you want to proceed?'
            );
            if (!confirmAdoption) {
                return; 
            }

            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${process.env.REACT_APP_API_URL}/${puppy._id}/adopt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Distance adoption successfully initiated!');

                    await fetch(`${process.env.REACT_APP_API_URL}/api/auth/donate`, { 
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ amount: 10 }) 
                    });
                } else {
                    alert('Adoption request failed!');
                    console.error('Error in distance adoption:', data.message);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        } else {
            alert('You must be logged in to adopt from a distance.');
            navigate('/login');
        }
    };

    const handleFullAdoption = () => {
        if (userInfo) {
            setShowAdoptForm(true);
        } else {
            alert('You must be logged in to make a full adoption request.');
            navigate('/login');
        }
    };

    if (!puppy) return <div>Puppy not found!</div>;

    return (
        <div className="everypage-box">
            <h2>{puppy.name}</h2>
            <img src={puppy.imageUrl} alt={puppy.name} className="img-fluid small-margin" /> 
            <p><strong>Gender:</strong> {puppy.sex}</p> 
            <p><strong>Age:</strong> {puppy.age} years</p>
            <p><strong>Description:</strong> Hi, I am {puppy.name} and I am a {puppy.age < 2 ? 'puppy' : (puppy.age < 6 ? 'young dog' : 'adult')}, in fact, I am {puppy.age} years old.<br/> 
            I am {puppy.sex === 'male' ? 'a boy' : 'a girl'} and I am looking for a forever family.<br/>
            If you want to request more information about me, you can contact my uncles using the form below!</p>

            <button className="btn btn-primary small-margin" onClick={handleDistanceAdoption}>
                Distance Adoption
            </button>
            <button className="btn btn-secondary small-margin" onClick={handleFullAdoption}>
                Full Adoption Request
            </button>

            {showAdoptForm && <AdoptForm puppyId={puppy._id} />}
        </div>
    );
};

export default PuppyDetail;