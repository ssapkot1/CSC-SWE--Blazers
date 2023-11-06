import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import SearchTableRow from "./search-TableRow";
export default class Search extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeSearch = this.onChangeSearch.bind(this);
    
    
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      movies: [],
      search: ''
     
    }
    
  
    
  }
  onChangeSearch(e) {
    this.setState({ search: e.target.value })
  }
  

  onSubmit(e) {
    e.preventDefault();
  
    // Extract the search query from the form input
    const searchQuery = this.state.search;
  
    // Construct the URL to search for movies with titles containing the search query
    const apiUrl = `http://localhost:4000/movies/?title=${searchQuery}`;
  
    axios.get(apiUrl)
      .then(res => {
        // Filter the movies based on the title containing the search query
        const filteredMovies = res.data.filter(movie => movie.title.includes(searchQuery));
        
        this.setState({
          movies: filteredMovies
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.movies.map((res, i) => {
      return <SearchTableRow obj={res} key={i} />;
    });



  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
       
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.search} onChange={this.onChangeSearch} />
        </Form.Group>
       
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            
            <th>Genre</th>
            
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>

    </div>);
    
  }
} 