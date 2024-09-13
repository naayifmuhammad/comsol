import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook to navigate to other routes

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      }, ); // Include credentials for sessions

      if (response.data.success) {
        // Save user data or token to local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to /dashboard and pass a success message
        navigate('/dashboard', { state: { message: 'Login successful' } });
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
