import React, { useState, useEffect } from 'react';
import '../style/EveryPageStyle.css'

const ManageVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [newVolunteer, setNewVolunteer] = useState({ name: '', description: '', phone: '', email: '' });
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers`);
            const data = await response.json();
            setVolunteers(data);
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    const handleCreateVolunteer = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newVolunteer),
            });
            if (!response.ok) {
                throw new Error('Error adding volunteer.');
            }
            setNewVolunteer({ name: '', description: '', phone: '', email: '' });
            setFeedbackMessage('New volunteer added successfully!');
            setIsError(false);
            fetchVolunteers();
        } catch (error) {
            setFeedbackMessage(error.message);
            setIsError(true);
        }
    };
    
    const handleDeleteVolunteer = async (id) => {
        if (window.confirm('Are you sure you want to delete this volunteer?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error deleting volunteer.');
                }
                setFeedbackMessage('Volunteer deleted successfully!');
                setIsError(false);
                fetchVolunteers();
            } catch (error) {
                setFeedbackMessage(error.message);
                setIsError(true);
            }
        }
    };    

    return (
        <div className="manage-volunteers">
            <h3>Add a New Volunteer</h3>
            <form onSubmit={handleCreateVolunteer} className="mb-4">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newVolunteer.name}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newVolunteer.description}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newVolunteer.phone}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={newVolunteer.email}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Volunteer</button>
            </form>

            <h3 className="text-center mb-4">Manage Volunteers</h3>
            {feedbackMessage && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                    {feedbackMessage}
                </div>
            )}
            <ul className="list-group mb-4">
                {volunteers.map((volunteer) => (
                    <li key={volunteer._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>{volunteer.name}</strong>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteVolunteer(volunteer._id)}>
                            Delete Volunteer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageVolunteers;