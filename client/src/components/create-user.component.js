import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateUserComponent = ({ onSwitchMode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); 

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  
    if (isLoggedIn) {
      history.push('/profile');
      alert('You are already logged in. Redirecting to your profile.');
    }
  }, [isLoggedIn, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('https://blazeback.onrender.com/users/create-user', { name, email, password })
      .then(res => {
        history.push('/login'); 
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        console.error('Error:', err);
      });
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
       
      </Form>
    </div>
  );
};

export default CreateUserComponent;
