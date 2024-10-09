import React, { useEffect, useState } from 'react';
import ContactsComp from '../components/ContactsComp';
import '../style/EveryPageStyle.css'
import './ContactsPage.css'

const ContactsPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/volunteers'); 
                if (!response.ok) {
                    throw new Error('Error retrieving volunteers');
                }
                const data = await response.json();
                setVolunteers(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchVolunteers();
    }, []); 

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>Error: {error}</div>; 

    return (
        <div className="everypage-box">
            <div className='contacts-general'>
                <h2>In this page you will find all the ways to contact 224Adoption:</h2>
                    <h5>
                        <strong>mail:</strong> info@224adoption.com <br></br>
                        <strong>phone:</strong> (123) 456-7890 <br></br>
                        <strong>address:</strong> via esempio 1, CountryX, 1234 <br/><br/>
                        And if you feel like it, you can give your financial support here: <br></br> 
                        <strong>IBAN:</strong> ITibanesempio0123456789 <br></br>
                    </h5>
             </div>
            <ContactsComp />
            <div className="contacts-volunteers">
                <h3>If you already have a clear idea, you can get in touch with one of our volunteers:</h3>
                {volunteers.map((volunteer, index) => (
                    <div key={index} className="volunteer-card">
                        <h4>{volunteer.name}</h4>
                        <p>{volunteer.description}</p>
                        <p>Phone: {volunteer.phone}</p>
                        <p>Email: {volunteer.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactsPage;
