import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import axios from 'axios';

export const LoginPage = () => {

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
          navigate('/', { state: { message: 'Login successful' } });
        }
      } catch (error) {
        setError('Login failed. Please check your credentials.');
      }
    };

    //handle registration here
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userType: '',
        email: '',
        mobile: '',
        office: '',
        officeAddress: '',
        gender: '',
        password_reg: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleRegister = async (e) => {
        e.preventDefault();
        try {
          // Make sure the API URL points to the correct backend URL 
          const response = await axios.post('http://localhost:5000/api/auth/register', formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    const handleNumberChange = (e) => {
      const { value } = e.target;

      // Phone number validation - only allow digits and ensure it's 10 digits long
      const phoneRegex = /^[0-9]{0,10}$/; // Accepts up to 10 digits
      if (phoneRegex.test(value)) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('success', value)
        setError(""); // Clear the error if the input is valid
      } else {
        setError("Please enter a valid 10-digit phone number.");
      }
    };


  return (
    <div className="login-reg-form-container">
      <div className="container">
      <input type="checkbox" id="check" />
      <div className="login form">
        <header>Login</header>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <a href="">Forgot password?</a>

          <input type="submit" className="button" value="Login" />
        </form>
        <div className="signup">
          <span className="signup">
            Don't have an account?
            <label htmlFor="check">Signup</label>
          </span>
        </div>
      </div>
    
    
      <div className="registration form">
      <header>Register</header>
        <form onSubmit={handleRegister}>
          <div className="two-column">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />

         <div className="two-column">
         <select name="userType" onSubmit={handleChange} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
         
          <select name="gender" onChange={handleChange}>
            <option value="">--Select Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
         </div>


          <input
            name="office"
            placeholder="Office"
            onChange={handleChange}
            required
          />
          <input
            name="officeAddress"
            placeholder="Office Address"
            onChange={handleChange}
            required
          />


          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
          />
          <input type="submit" className="button" value="Register"/>
        </form>
        <div className="signup">
          <span className="signup">
            Already have an account?
            <label htmlFor="check">Login</label>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
