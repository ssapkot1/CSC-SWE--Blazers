import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MoviesTableRow from './movies-TableRow';

export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
 
    axios.get('http://localhost:4000/movies/' )
    .then(res => {
      this.setState({
        movies: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
    
  }
  DataTable() {
    return this.state.movies.map((res, i) => {
      return <MoviesTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            
            <th>Genre</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}