import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class AddMovie extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      title: '',
      genre: ''
    }
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value })
  }
  onChangeGenre(e) {
    this.setState({ genre: e.target.value })
  }
 
  onSubmit(e) {
    e.preventDefault()
    const PostObject = {
      title: this.state.title,
      genre: this.state.genre,
      
    };
    axios.post('http://localhost:4000/movies/add-movie', PostObject)
      .then(res => console.log(res.data));
    this.setState({     
    title: '',
    genre: '',
     })
  }
  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeTitle} />
        </Form.Group>
        <Form.Group controlId="Genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={this.state.genre} onChange={this.onChangeGenre} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Add Movie
        </Button>
      </Form>
    </div>);
  }
}