import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
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
      const { data } = await axios.post(`${apiUrl}/api/auth/register`, { email, password });
      
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register.');
    }
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Register</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mt-2" id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mt-2" id="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>
          <Button className="w-100 mt-3" type="submit">
            Register
          </Button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Register;