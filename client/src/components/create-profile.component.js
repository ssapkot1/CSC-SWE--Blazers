import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class CreateProfile extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeProfileName = this.onChangeProfileName.bind(this);
    this.onChangeProfileEmail = this.onChangeProfileEmail.bind(this);
    this.onChangeProfilePassword = this.onChangeProfilePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  onChangeProfileName(e) {
    this.setState({ name: e.target.value })
  }
  onChangeProfileEmail(e) {
    this.setState({ email: e.target.value })
  }
  onChangeProfilePassword(e) {
    this.setState({ password: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const profileObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:4000/profiles/create-profile', profileObject)
      .then(res => console.log(res.data));
    this.setState({ name: '', email: '', password: '' })
  }
  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeProfileName} />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={this.state.email} onChange={this.onChangeProfileEmail} />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeProfilePassword} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Profile
        </Button>
      </Form>
    </div>);
  }
}