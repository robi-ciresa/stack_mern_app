import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAdoption } from '../redux/adoptions/adoptionThunks';
import '../style/EveryPageStyle.css';

const AdoptForm = ({ puppyId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await dispatch(createAdoption({ ...formData, puppy: puppyId }));

            if (response.error) {
                throw new Error(response.error.message);
            }

            alert('Adoption request submitted successfully!');
            setFormData({ name: '', email: '', message: '' }); // Reset the form
        } catch (error) {
            setError('An error occurred while submitting the request: ' + error.message);
        } finally {
            setLoading(false);
        }   
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="name" className="small-margin">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="small-margin">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="message" className="small-margin">Message</label>
                <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary small-margin" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
    );
};

export default AdoptForm;
