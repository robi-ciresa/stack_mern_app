import React, { useState } from 'react';
import '../style/EveryPageStyle.css';
import './ContactsComp.css';

const ContactsComp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [donationAmount, setDonationAmount] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDonationChange = (e) => {
        setDonationAmount(e.target.value);
    };

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/donate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({ amount: Number(donationAmount) }),
            });
    
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                if (token) {
                    alert('Donation recorded successfully! Total donations: ' + data.totalDonations);
                } else {
                    alert('Thank you for your donation!');
                }
                setDonationAmount('');
            } else {
                alert('Error recording donation.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred, please try again later.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Message sent successfully!');
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    alert('Error sending message.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred, please try again later.');
            });
    };

    return (
        <div className="contacts-box">
            <section className='align-center'>
                <h4>Even the smallest help makes a huge difference for us. <br />
                If you want to help us, you can do it here:</h4>
                <form onSubmit={handleDonationSubmit}>
                    <select value={donationAmount} onChange={handleDonationChange} required>
                        <option value="">Select an amount</option>
                        <option value="5">5 euros</option>
                        <option value="10">10 euros</option>
                        <option value="25">25 euros</option>
                        <option value="50">50 euros</option>
                        <option value="100">100 euros</option>
                    </select>
                    <button type="submit" className="btn btn-primary small-margin">Donate</button>
                </form>
            </section>

            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="small-margin" htmlFor="name">Name</label>
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
                <div className="form-group">
                    <label className="small-margin" htmlFor="email">Email</label>
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
                <div className="form-group">
                    <label className="small-margin" htmlFor="message">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary small-margin">Send Message</button>
            </form>
        </div>
    );
};

export default ContactsComp;
