import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/signup.css'; // Import your CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/register', { email, password, name });
      console.log(response.data);
      if (response.data.success) {
        navigate('/');
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      console.error('There was an error signing up!', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="row no-gutters">
        <div className="col-md-6 welcome-section d-flex align-items-center justify-content-center">
          <div className="welcome-message text-center">
            <h1>Welcome to Masala Delight</h1>
            <p>Join us and enjoy the best Indian cuisine.</p>
          </div>
        </div>
        <div className="col-md-6 signup-section d-flex align-items-center justify-content-center">
          <div className="form-container p-4 shadow rounded">
            <h2 className="text-center mb-4">Signup</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSignup}>
              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="input-group">
                  <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Signup</button>
            </form>
            <div className="text-center mt-3">
              <p>Already have an account? <a href="/">Login here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
