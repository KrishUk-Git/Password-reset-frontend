import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      setMessage(data.message);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Forgot Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button className="w-100 mt-3" type="submit">
            Get Reset Link
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default ForgotPassword;