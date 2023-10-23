import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.onChangeProfileName = this.onChangeProfileName.bind(this);
    this.onChangeProfileEmail = this.onChangeProfileEmail.bind(this);
    this.onChangeProfilePassword = this.onChangeProfilePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:4000/profiles/edit-profile/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
    axios.put('http://localhost:4000/profiles/update-profile/' + this.props.match.params.id, profileObject)
      .then((res) => {
        console.log(res.data)
        console.log('Profile successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Profile List 
    this.props.history.push('/profile-list')
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
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeProfileEmail} />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeProfilePassword} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>);
  }
}