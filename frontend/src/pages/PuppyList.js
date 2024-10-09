import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPuppies } from '../redux/puppies/puppyThunks';
import '../style/EveryPageStyle.css';

const PuppyList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { puppies, loading, error } = useSelector((state) => state.puppies);

    const [sexFilter, setSexFilter] = useState(''); 
    const [ageFilter, setAgeFilter] = useState(''); 

    useEffect(() => {
        dispatch(fetchPuppies());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredPuppies = puppies.filter((puppy) => {
        if (puppy.adopted) return false; 

        const matchesSex = sexFilter ? puppy.sex === sexFilter : true;

        let matchesAge = true;
        if (ageFilter === 'puppy') {
            matchesAge = puppy.age <= 1;
        } else if (ageFilter === 'young') {
            matchesAge = puppy.age >= 2 && puppy.age <= 5;
        } else if (ageFilter === 'senior') {
            matchesAge = puppy.age >= 6;
        }

        return matchesSex && matchesAge;
    });

    const handleCardClick = (id) => {
        navigate(`/puppies/${id}`);
    };

    return (
        <div className="everypage-box">
            <h2>Available Puppies</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label className='small-margin'>Filter by Gender:</label>
                    <select
                        className="form-select"
                        value={sexFilter}
                        onChange={(e) => setSexFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className='small-margin'>Filter by Age:</label>
                    <select
                        className="form-select"
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                    >
                        <option value="">All Ages</option>
                        <option value="puppy">Puppy (0-1 year)</option>
                        <option value="young">Young (2-5 years)</option>
                        <option value="senior">Senior (6+ years)</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {filteredPuppies.length > 0 ? (
                    filteredPuppies.map((puppy) => (
                        <div className="col-md-4" key={puppy._id}>
                            <div className="card mb-4" onClick={() => handleCardClick(puppy._id)}>
                                <img src={puppy.imageUrl} alt={puppy.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{puppy.name}</h5>
                                    <p className="card-text">Gender: {puppy.sex}</p>
                                    <p className="card-text">Age: {puppy.age} years</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No puppies found with the selected filters.</div>
                )}
            </div>
        </div>
    );
};

export default PuppyList;