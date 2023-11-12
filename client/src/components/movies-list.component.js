import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MoviesTableRow from './MoviesTableRow';

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/movies/')
      .then(res => {
        this.setState({
          movies: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.movies.map((res, i) => {
      // Passing down the rateMovie function as a prop to each row
      return <MoviesTableRow obj={res} key={i} rateMovie={this.rateMovie} />;
    });
  }

  // Function to handle movie rating
  rateMovie = (movieId, rating) => {
    // Implement the functionality to send the rating to the server
    console.log(`Movie ID: ${movieId} rated with: ${rating}`);
    // Example axios call
    axios.post('http://localhost:4000/ratings', { movieId, rating })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error rating movie:', error);
      });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th> {/* Added a heading for Rating */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    );
  }
}
