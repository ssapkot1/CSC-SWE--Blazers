import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class EditPost extends Component {
  constructor(props) {
    super(props)
    this.onChangePostStreet = this.onChangePostStreet.bind(this);
    this.onChangePostCity = this.onChangePostCity.bind(this);
    this.onChangePostState = this.onChangePostState.bind(this);
    this.onChangePostZip = this.onChangePostZip.bind(this);
    this.onChangePostCompany =  this.onChangePostCompany.bind(this);
    this.onChangePostJobTitle = this.onChangePostJobTitle.bind(this);
    this.onChangePostMaxSal = this.onChangePostMaxSal.bind(this);
    this.onChangePostMinSal = this.onChangePostMinSal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      street: '',
      city: '',
      state: '',
      zip:'',
      company:'',
      jobTitle:'',
      maxSal:'',
      minSal:''
    }
  }
  componentDidMount() {
    axios.get('posts/edit-post/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          street: res.data.street,
          city: res.data.city,
          State: res.data.state,
          zip: res.data.zip,
          company: res.data.company,
          jobTitle: res.data.jobTitle,
          maxSal: res.data.maxSal,
          minSal: res.data.minSal
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangePostStreet(e) {
    this.setState({ street: e.target.value })
  }
  onChangePostCity(e) {
    this.setState({ city: e.target.value })
  }
  onChangePostState(e) {
    this.setState({ state: e.target.value })
  }
  onChangePostZip(e) {
    this.setState({ zip: e.target.value })
  }
  onChangePostCompany(e) {
    this.setState({ company: e.target.value })
  }
  onChangePostJobTitle(e) {
    this.setState({ jobTitle: e.target.value })
  }
 onChangePostMaxSal(e) {
    this.setState({ maxSal: e.target.value })
  }
  onChangePostMinSal(e) {
    this.setState({ minSal: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const studentObject = {
      street: this.state.name,
      city: this.state.email,
      state: this.state.rollno,
      zip: this.state.rollno,
      company: this.state.rollno,
      jobTitle: this.state.rollno,
      maxSal: this.state.rollno,
      minSal: this.state.rollno
    };
    axios.put('posts/update-post/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Job Posting successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Student List 
    this.props.history.push('/post-list')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Street">
          <Form.Label>Street</Form.Label>
          <Form.Control type="text" value={this.state.street} onChange={this.onChangePostStreet} />
        </Form.Group>
        <Form.Group controlId="City">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" value={this.state.city} onChange={this.onChangePostCity} />
        </Form.Group>
        <Form.Group controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={ this.onChangePostState} />
        </Form.Group>

        <Form.Group controlId="Zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" value={this.state.zip} onChange={this.onChangePostZip} />
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
          <Form.Control type="text" value={this.state.maxSal} onChange={this.onChangePostMaxSal} />
        </Form.Group>
        <Form.Group controlId="Minimum Salary">
          <Form.Label>Minimun Salary</Form.Label>
          <Form.Control type="text" value={this.state.minSal} onChange={this.onChangePostMinSal} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
         Edit Post
        </Button>
      </Form>
    </div>);
  }
}