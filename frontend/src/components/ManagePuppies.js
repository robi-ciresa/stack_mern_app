import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPuppies, editPuppy, createPuppy, removePuppy } from '../redux/puppies/puppyThunks';
import '../style/EveryPageStyle.css';

const ManagePuppies = () => {
    const dispatch = useDispatch();
    const { puppies } = useSelector((state) => state.puppies);
    const [editedPuppies, setEditedPuppies] = useState({});
    const [newPuppy, setNewPuppy] = useState({ name: '', sex: '', age: 0, adopted: false, imageUrl: '' });
    const [selectedPuppyId, setSelectedPuppyId] = useState(null);
    
    useEffect(() => {
        dispatch(fetchPuppies());
    }, [dispatch]);

    const handlePuppyChange = (id, field, value) => {
        setEditedPuppies((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value,
            },
        }));
    };

    const handleSavePuppy = (id) => {
        const updatedPuppy = editedPuppies[id];
        dispatch(editPuppy({ id, updatedPuppy }));
    };

    const handleDeletePuppy = (id) => {
        if (window.confirm('Are you sure you want to delete this puppy?')) {
            dispatch(removePuppy(id));
        }
    };

    const handleCreatePuppy = (e) => {
        e.preventDefault();
        dispatch(createPuppy(newPuppy)).then(() => {
            setNewPuppy({ name: '', sex: '', age: 0, adopted: false, imageUrl: '' });
        });
    };

    return (
        <div className="mt-4">
            <h3 className="mt-4">Add a New Puppy</h3>
            <form onSubmit={handleCreatePuppy} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPuppy.name}
                        onChange={(e) => setNewPuppy({ ...newPuppy, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sex:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPuppy.sex}
                        onChange={(e) => setNewPuppy({ ...newPuppy, sex: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newPuppy.age}
                        onChange={(e) => setNewPuppy({ ...newPuppy, age: Number(e.target.value) })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPuppy.imageUrl}
                        onChange={(e) => setNewPuppy({ ...newPuppy, imageUrl: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Puppy
                </button>
            </form>
            
            <h3 className="mb-4">Manage Puppies</h3>
            <ul className="list-group">
                {puppies.map((puppy) => (
                    <li key={puppy._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div onClick={() => setSelectedPuppyId(puppy._id)} style={{ cursor: 'pointer' }}>
                            <strong>{puppy.name}</strong>
                        </div>
                        {selectedPuppyId === puppy._id && (
                            <div className="mt-3">
                                <label className="form-label">Sex:</label>
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    value={editedPuppies[puppy._id]?.sex || puppy.sex}
                                    onChange={(e) => handlePuppyChange(puppy._id, 'sex', e.target.value)}
                                />
                                <label className="form-label">Age:</label>
                                <input
                                    className="form-control mb-2"
                                    type="number"
                                    value={editedPuppies[puppy._id]?.age || puppy.age}
                                    onChange={(e) => handlePuppyChange(puppy._id, 'age', Number(e.target.value))}
                                />
                                <label className="form-label">Image URL:</label>
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    value={editedPuppies[puppy._id]?.imageUrl || puppy.imageUrl}
                                    onChange={(e) => handlePuppyChange(puppy._id, 'imageUrl', e.target.value)}
                                />
                                <button className="btn btn-success me-2" onClick={() => handleSavePuppy(puppy._id)}>
                                    Save Changes
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeletePuppy(puppy._id)}>
                                    Delete Puppy
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePuppies;