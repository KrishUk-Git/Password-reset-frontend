import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate the token when the component mounts
    const validateToken = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`);
        setIsValidToken(true);
      } catch (err) {
        setError('Invalid or expired password reset link.');
        setIsValidToken(false);
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message + " You will be redirected shortly.");
      setTimeout(() => {
        navigate('/login'); // Or to your login page
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  if (!isValidToken) {
    return (
        <div className="auth-form">
            <h3 className="text-center mb-4">Reset Password</h3>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
  }

  return (
    <div className="auth-form">
      <h3 className="text-center mb-4">Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;