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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`);
                const data = await response.json();
                console.log('Fetched reviews:', data);
                setReviews(data);
            } catch (error) {
                console.error('Error retrieving reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (reviews.length > 0) {
            const interval = setInterval(() => {
                setCurrentReviewIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % reviews.length;
                    console.log('Changing to review index:', newIndex);
                    return newIndex;
                });
            }, 10000);

            return () => clearInterval(interval);
        }
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

    const currentReview = reviews[currentReviewIndex];
    console.log('Current review:', currentReview);

    return (
        <div className="align-center">
            <section className="about-review">
                <h3>Adopter Reviews</h3>
                {currentReview ? (
                    <div key={currentReview._id} className="review-box">
                    <p><strong>{currentReview.name} says:</strong></p>
                    <p>"{currentReview.text}"</p>
                    <div className="rating">
                        {renderStars(currentReview.rating)}
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
