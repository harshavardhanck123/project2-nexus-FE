import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/login', { email, password });
      if (response.data.message === 'Login Successfull') {
        navigate(`/home/${response.data.user.id}`); 
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="row no-gutters">
        <div className="col-md-6 welcome-section d-flex align-items-center justify-content-center">
          <div className="welcome-message text-center">
            <h1>Welcome to Masala Delight</h1>
            <p>Experience the finest Indian cuisine with us.</p>
          </div>
        </div>
        <div className="col-md-6 login-section d-flex align-items-center justify-content-center">
          <div className="form-container p-4 shadow rounded">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
