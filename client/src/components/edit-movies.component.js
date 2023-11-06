import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class EditMovie extends Component {
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
  componentDidMount() {
    axios.get('http://localhost:4000/movies/edit-movies/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          genre: res.data.genre,
          
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value })
  }
  onChangeGenre(e) {
    this.setState({ genre: e.target.value })
  }
 
  onSubmit(e) {
    e.preventDefault()
    const movieObject = {
      title: this.state.title,
      genre: this.state.genre,
      
    };
    axios.put('http://localhost:4000/movies/update-movies/' + this.props.match.params.id, movieObject)
      .then((res) => {
        console.log(res.data)
        console.log('Movie Posting successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Student List 
    this.props.history.push('/movie-list')
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
          <Form.Control type="text" value={this.state.Genre} onChange={this.onChangeGenre} />
        </Form.Group>
        

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
         Edit Movie
        </Button>
      </Form>
    </div>);
  }
}