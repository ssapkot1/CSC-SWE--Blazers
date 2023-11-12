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
                console.log('Movie successfully deleted!');
                // Refresh the page or use a state update to remove the deleted movie
            }).catch((error) => {
                console.log(error)
            });
    }

    // Function to handle the click on a rating button
    handleRating = (rating) => {
        // Pass the movie ID and rating up to the parent component
        this.props.rateMovie(this.props.obj._id, rating);
    };

    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.genres.join(', ')}</td> {/* Assuming genres is an array */}
                <td>{this.props.obj.plot}</td>
                <td>{this.props.obj.runtime}</td>
                <td>{this.props.obj.cast.join(', ')}</td> {/* Assuming cast is an array */}
                <td>{this.props.obj.imdb.rating}</td>
                
                {/* Rating buttons */}
                <td>
                    {Array.from({ length: 10 }, (_, index) => (
                        <Button
                            key={index}
                            variant="link"
                            onClick={() => this.handleRating(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </td>

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
