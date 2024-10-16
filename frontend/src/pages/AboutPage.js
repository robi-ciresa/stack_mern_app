import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import AboutComp from '../components/AboutComp';
import ReactStars from 'react-rating-stars-component';
import '../style/EveryPageStyle.css'

const AboutPage = () => {
    const reviewFormRef = useRef(null);
    const [review, setReview] = useState({ name: '', text: '', rating: 0 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setReview({ ...review, rating: newRating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            if (response.ok) {
                setReview({ name: '', text: '', rating: 0 });
                alert('Review submitted successfully!');
            } else {
                alert('Error submitting the review.');
            }
        } catch (error) {
            console.error('Error submitting the review:', error);
        }
    };    

    const scrollToForm = () => {
        reviewFormRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="everypage-box">
            <AboutComp onScrollToForm={scrollToForm} />

            <section className="align-center">
                <Container>
                    <Row>
                        <Col>
                            <h2>What we do in detail:</h2>
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="submit-review-section" ref={reviewFormRef}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h2>Send us your review</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formReviewName">
                                    <Form.Label className="small-margin">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={review.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formReviewMessage">
                                    <Form.Label className="small-margin">Review</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter your review"
                                        name="text"
                                        value={review.text}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formReviewRating">
                                    <Form.Label className="small-margin">Rating</Form.Label>
                                    <ReactStars
                                        count={5}
                                        onChange={handleRatingChange}
                                        size={28}
                                        activeColor="#ffd700"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="small-margin">
                                    Submit review
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default AboutPage;