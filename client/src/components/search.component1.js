import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class Search extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    // Setting up functions
    this.onTitle = this.onTitle.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      title: '',
    }
    
  }
  
 
  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
       
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onTitle} />
        </Form.Group>
       
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Search
        </Button>
      </Form>
    </div>);
  }
}