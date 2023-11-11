import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory

const UserComponent = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // For redirecting to another route

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userObject = { name, email, password };

    const endpoint = isLoginMode
      ? 'http://localhost:4000/users/login'
      : 'http://localhost:4000/users/create-user';

    axios.post(endpoint, userObject)
      .then(res => {
        console.log(res.data);
        // Handle successful login
        if (isLoginMode) {
          // Assuming the response includes a token on successful login
          localStorage.setItem('token', res.data.token);
          history.push('/profile'); // Redirect to the profile page
        }
      })
      .catch(err => {
        console.error('Error:', err);
        // Handle errors
      });

    // Reset the fields after user creation
    if (!isLoginMode) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="form-wrapper">
      <Button onClick={switchModeHandler}>
        Switch to {isLoginMode ? 'Create User' : 'Login'}
      </Button>
      <Form onSubmit={onSubmit}>
        {!isLoginMode && (
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </Form.Group>
        )}

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text" 
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

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          {isLoginMode ? 'Login' : 'Create User'}
        </Button>
      </Form>
    </div>
  );
};

export default UserComponent;
