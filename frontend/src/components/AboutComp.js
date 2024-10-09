import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EveryPageStyle.css';
import './AboutComp.css';

const AboutComp = ({ onScrollToForm }) => {
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error retrieving reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReviewIndex((prevIndex) =>
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [reviews]);

    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>
                ★
            </span>
        ));
    };

    const handleReviewButtonClick = () => {
        if (window.location.pathname === '/about') {
            onScrollToForm();
        } else {
            navigate('/about');
        }
    };

    return (
        <div className="align-center">
            <section className="about-review">
                <h3>Adopter Reviews</h3>
                {reviews.length > 0 ? (
                    <div className="review-box">
                        <p><strong>{reviews[currentReviewIndex]?.name} says:</strong></p>
                        <p>"{reviews[currentReviewIndex]?.text}"</p>
                        <div className="rating">
                            {renderStars(reviews[currentReviewIndex]?.rating)}
                        </div>
                    </div>
                ) : (
                    <p>No reviews available.</p>
                )}
                <button onClick={handleReviewButtonClick} className="btn btn-primary review-button">
                    Send us your review
                </button>
            </section>
            <section className="about-process">
                <h2>The Adoption Process</h2>
                <p>
                    'I have too little space', 'I don’t have enough time to dedicate to a puppy', 'It will grow too big' are not excuses; it’s all true.<br />
                    Taking care of a puppy is serious business, and we at 224Adoption are aware of it.<br />
                    That’s why we believe that guiding adopters in their choice is as essential as helping them understand which puppy truly suits them.<br />
                    <br />
                    Our adoption process is simple.<br />
                    Choose the puppy you want to adopt, fill out the adoption form, and our team will contact you for further details.
                </p>
            </section>
        </div>
    );
};

export default AboutComp;