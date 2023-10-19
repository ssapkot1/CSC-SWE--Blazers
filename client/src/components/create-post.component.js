import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangePostStreet = this.onChangePostStreet.bind(this);
    this.onChangePostCity = this.onChangePostCity.bind(this);
    this.onChangePostState = this.onChangePostState.bind(this);
    this.onChangePostZip = this.onChangePostZip.bind(this);
    this.onChangePostCompany =  this.onChangePostCompany.bind(this);
    this.onChangePostJobTitle = this.onChangePostJobTitle.bind(this);
    this.onChangePostMaxSal = this.onChangePostMaxSal.bind(this);
    this.onChangePostMinSal = this.onChangePostMinSal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      location: '',
      jobLocationCity: '',
      jobLocationState: '',
      jobLocationPostal:'',
      company:'',
      jobTitle:'',
      maxSalary:'',
      minSalary:''
    }
  }
  onChangePostStreet(e) {
    this.setState({ location: e.target.value })
  }
  onChangePostCity(e) {
    this.setState({ jobLocationCity: e.target.value })
  }
  onChangePostState(e) {
    this.setState({ jobLocationState: e.target.value })
  }
  onChangePostZip(e) {
    this.setState({ jobLocationPostal: e.target.value })
  }
  onChangePostCompany(e) {
    this.setState({ company: e.target.value })
  }
  onChangePostJobTitle(e) {
    this.setState({ jobTitle: e.target.value })
  }
 onChangePostMaxSal(e) {
    this.setState({ maxSalary: e.target.value })
  }
  onChangePostMinSal(e) {
    this.setState({ minSalary: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const PostObject = {
      location: this.state.location,
      jobLocationCity: this.state.jobLocationCity,
      jobLocationState: this.state.jobLocationState,
      jobLocationPostal: this.state.jobLocationPostal,
      company: this.state.company,
      jobTitle: this.state.jobTitle,
      maxSalary: this.state.maxSalary,
      minSalary: this.state.minSalary
    };
    axios.post('http://localhost:4000/posts/create-post', PostObject)
      .then(res => console.log(res.data));
    this.setState({     
    location: '',
    jobLocationCity: '',
    jobLocationState: '',
    jobLocationPostal:'',
    company:'',
    jobTitle:'',
    maxSalary:'',
    minSalary:''})
  }
  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Location">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" value={this.state.location} onChange={this.onChangePostStreet} />
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" value={this.state.jobLocationCity} onChange={this.onChangePostCity} />
        </Form.Group>
        <Form.Group controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={ this.onChangePostState} />
        </Form.Group>

        <Form.Group controlId="Zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" value={this.state.jobLocationPostal} onChange={this.onChangePostZip} />
        </Form.Group>

        <Form.Group controlId="Company">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" value={this.state.company} onChange={this.onChangePostCompany} />
        </Form.Group>
        <Form.Group controlId="Job Title">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" value={this.state.jobTitle} onChange={this.onChangePostJobTitle} />
        </Form.Group>
        <Form.Group controlId="Max Salary">
          <Form.Label>Max Salary</Form.Label>
          <Form.Control type="text" value={this.state.maxSalary} onChange={this.onChangePostMaxSal} />
        </Form.Group>
        <Form.Group controlId="Minimum Salary">
          <Form.Label>Minimun Salary</Form.Label>
          <Form.Control type="text" value={this.state.minSalary} onChange={this.onChangePostMinSal} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Post
        </Button>
      </Form>
    </div>);
  }
}