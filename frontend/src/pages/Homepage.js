import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Homepage.css'
import Slider from 'react-slick';
import AboutComp from '../components/AboutComp';
import ContactsComp from '../components/ContactsComp';
import '../style/EveryPageStyle.css'

const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    const imageUrls = [
        "https://media.istockphoto.com/id/1265210092/it/foto/giovane-donna-in-rifugio-per-animali.jpg?s=612x612&w=0&k=20&c=ZTe9DIWyaGNONjXJHYA5vpX7b4JmcMBdnWSP7zDnWIc=",
        "https://media.istockphoto.com/id/1266971137/it/foto/giovane-donna-in-rifugio-per-animali.jpg?s=612x612&w=0&k=20&c=n6DOPNV1l6mWFbP3k4IngSnO9bGRSTeNY9Tuie9E3rs=",
        "https://media.istockphoto.com/id/2155267362/it/foto/dog-at-the-shelter-animal-shelter-volunteer-takes-care-of-dogs.jpg?s=612x612&w=0&k=20&c=HB7M05Tna8FubcZZtq1pmWypB6Sraqq73Ig3jrHlLJ4=",
        "https://media.istockphoto.com/id/2155006095/it/foto/dog-at-the-shelter-animal-shelter-volunteer-takes-care-of-dogs.jpg?s=612x612&w=0&k=20&c=Odwu8A4i5ebjEloKGCj7ZiUcVOAAIqPz726WTVoSHc0=",
        "https://media.istockphoto.com/id/1345008150/it/foto/giovane-donna-con-lavoratore-che-sceglie-quale-cane-adottare-da-un-rifugio.jpg?s=612x612&w=0&k=20&c=ml2aluBvtN6wULoKPfZj0-rEJHeA3K-VD4joci50m-s=",
        "https://media.istockphoto.com/id/2155265693/it/foto/dog-at-the-shelter-animal-shelter-volunteer-takes-care-of-dogs.jpg?s=612x612&w=0&k=20&c=fgW9UZ6tt9EhTXdpzeZ2Ouik5QM7GSYj6cEzbwBwjb0=",
        "https://media.istockphoto.com/id/2040588988/it/foto/dog-in-animal-shelter-waiting-for-adoption-dog-behind-the-fences-canine-behind-bars.jpg?s=612x612&w=0&k=20&c=Togbg5b8ydC7pzhAvq4WoSOMtH4OitIXnKvbwvi6ZBs=",
        "https://media.istockphoto.com/id/1285652663/it/foto/giovane-donna-con-operaio-che-sceglie-quale-cane-adottare-da-un-rifugio.jpg?s=612x612&w=0&k=20&c=j4LZ78QfX2OUWWH2wUJahF6sxx2r7qxQO1-B0xlHodI=",
        "https://media.istockphoto.com/id/2155264995/it/foto/animal-shelter-volunteer-takes-care-of-dogs.jpg?s=612x612&w=0&k=20&c=AvZJXtxm8KqU6hiFtUTYI06IzpmSiaPfPqFc14hxCSY=",
        "https://media.istockphoto.com/id/1899320438/it/foto/cane-in-attesa-di-adozione-in-un-rifugio-per-animali-cane-senzatetto-nel-rifugio-concetto-di.jpg?s=612x612&w=0&k=20&c=sfeuYHJrDCaY0P5p8PO6xsNUeWT4mfYW5h4k1uhgWpY="
    ];

    return (
        <div className="everypage-box">
            <header className="homepage-header">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md={8}>
                            <img src='/logo.png' alt="Logo" style={{ width: '200px' }} />
                            <h1>Find your ideal puppy!</h1>
                            <p>Adopt a four-legged friend and change their life forever.</p>
                            <Button as={Link} to="/puppies" variant="primary">Discover our puppies</Button>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="carousel-section">
                <Container>
                    <Row>
                        <Col md={12}>
                            <Slider {...settings}>
                                {imageUrls.map((url, index) => (
                                    <div key={index}>
                                        <img src={url} alt={`Carousel ${index}`} style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                ))}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="about-section">
                <AboutComp />
            </section>
            
            <section className="contacts-section">
                <ContactsComp />
            </section>
        </div>
    );
};

export default Homepage;