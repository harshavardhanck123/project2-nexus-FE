import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faInfoCircle, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/logout', {}, { withCredentials: true });
      if (response.data.message === 'Logout Successful') {
        navigate('/');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${id}`);
        setData(response.data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="home-container">
      <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand logo" href="#">Masala Delight</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="#home"><FontAwesomeIcon icon={faHome} /> Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#menu"><FontAwesomeIcon icon={faUtensils} /> Menu</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#contact"><FontAwesomeIcon icon={faPhone} /> Contact</a>
      </li>
      <li className="nav-item ml-auto d-flex align-items-center">
        {data && !loading ? (
          <span className="navbar-text mr-3 corner">Hello, {data.name}</span>
        ) : (
          <span className="navbar-text mr-3 corner">Loading...</span>
        )}
      </li>
      <li className="nav-item">
        <button className="btn btn-danger logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </li>
    </ul>
  </div>
</nav>

        
        <div className="hero text-center d-flex align-items-center justify-content-center">
          <div className="hero-content">
            <h2>Welcome to Masala Delight</h2>
            <p>Enjoy our delicious meals and great atmosphere!</p>
            <a href="#menu" className="btn btn-primary w-50">Explore Menu</a>
          </div>
        </div>
      </header>

      <section id="menu" className="menu-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Menu</h2>
          <p className="text-center mb-5">Discover our wide range of delicious meals.</p>
          <div className="row">
            <div className="col-md-3 menu-item mb-4">Item 1</div>
            <div className="col-md-3 menu-item mb-4">Item 2</div>
            <div className="col-md-3 menu-item mb-4">Item 3</div>
            <div className="col-md-3 menu-item mb-4">Item 4</div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center mb-5">Learn more about our story and our team.</p>
        </div>
      </section>

      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center mb-5">Get in touch with us for reservations and inquiries.</p>
        </div>
      </section>

      <footer className="footer bg-dark text-center py-3">
        <p className="text-light">&copy; 2024 Masala Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
