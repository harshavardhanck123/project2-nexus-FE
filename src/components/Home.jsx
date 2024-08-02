import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faInfoCircle, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the user ID from URL params

  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle logout
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

  // Fetch user data when the component mounts or the ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${id}`);
        setData(response.data.user); // Set the user data
        console.log(response.data.user)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false); // No ID means no need to fetch data
    }
  },[id]);

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand logo" href="#">Masala Delight</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
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
              <li className="nav-item">
                {data && !loading ? (
                  <span className="navbar-text mr-3">Hello, {data.name}</span>
                ) : (
                  <span className="navbar-text mr-3">Loading...</span>
                )}
                <button className="btn btn-danger logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="hero text-center">
          <h2>Welcome to Our Restaurant</h2>
          <p>Enjoy our delicious meals and great atmosphere!</p>
          <a href="#menu" className="btn btn-primary">Explore Menu</a>
        </div>
      </header>

      <section id="menu" className="menu-section">
        <div className="container">
          <h2 className="text-center">Our Menu</h2>
          <p className="text-center">Discover our wide range of delicious meals.</p>
          <div className="row menu-grid">
            <div className="col-md-3 menu-item">Item 1</div>
            <div className="col-md-3 menu-item">Item 2</div>
            <div className="col-md-3 menu-item">Item 3</div>
            <div className="col-md-3 menu-item">Item 4</div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2 className="text-center">About Us</h2>
          <p className="text-center">Learn more about our story and our team.</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center">Get in touch with us for reservations and inquiries.</p>
        </div>
      </section>

      <footer className="footer bg-dark text-center py-3">
        <p className="text-light">&copy; 2024 Masala Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
