import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CreateUserComponent = ({ onSwitchMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/users/create-user', { name, email, password })
      .then(res => {
        console.log('User created:', res.data);
        onSwitchMode(); // Switch to login mode after user creation
      })
      .catch(err => {
        console.error('Error:', err);
      });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-wrapper">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create User
        </Button>
        <Button onClick={onSwitchMode} variant="secondary" size="lg" block="block" className="mt-3">
          Already have an account? Login
        </Button>
      </Form>
    </div>
  );
};

export default CreateUserComponent;
