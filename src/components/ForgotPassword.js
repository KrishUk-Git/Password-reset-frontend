import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('1. Form submitted. Email:', email); // Log when the form is submitted

    // Clear previous messages
    setMessage('');
    setError('');

    try {
      console.log('2. Sending POST request to backend...'); // Log before sending the API request
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });

      console.log('3. Received successful response from backend:', response.data); // Log the successful response
      setMessage(response.data.message);
    } catch (err) {
      // Log the full error object to see all details
      console.error('3. Received an error from backend:', err); 
      
      // Set a user-friendly error message from the response, or a generic one
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h3 className="text-center mb-4">Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;