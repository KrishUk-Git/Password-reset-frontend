import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    setError('');
    setMessage('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const { data } = await axios.post(`${apiUrl}/api/auth/reset-password/${token}`, { password });

      setMessage(data.message + " Redirecting...");
      setTimeout(() => navigate('/register'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Reset Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mt-2" id="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>
          <Button className="w-100 mt-3" type="submit">
            Update Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ResetPassword;