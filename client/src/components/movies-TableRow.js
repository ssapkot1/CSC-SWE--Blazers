import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
export default class MoviesTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteMovie = this.deleteMovie.bind(this);
    }
    deleteMovie() {
        axios.delete('http://localhost:4000/movies/delete-movie/' + this.props.obj._id)
            .then((res) => {
                console.log('Movie successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.genres}</td>
                <td>{this.props.obj.plot}</td>
                <td>{this.props.obj.runtime}</td>
                <td>{this.props.obj.cast}</td>
                <td>{this.props.obj.imdb.rating}</td>
                
                
                <td>
                    <Link className="edit-link" to={"/edit-movie/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteMovie} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}