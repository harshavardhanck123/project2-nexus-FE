import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/login.css'; // Import your CSS file
import Home from './Home';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the user ID from URL params

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/login', { email, password });
      if (response.data.message === 'Login Successfull') {
        navigate(`/home/${response.data.user.id}`); // Use the ID returned from the login response
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
        {loading && <p>Loading data...</p>}
        {data && (
          <div>
            <h3>User Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
