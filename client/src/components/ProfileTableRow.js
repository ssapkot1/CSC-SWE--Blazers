import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
export default class ProfileTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteProfile = this.deleteProfile.bind(this);
    }
    deleteProfile() {
        axios.delete('http://localhost:4000/profiles/delete-profile/' + this.props.obj._id)
            .then((res) => {
                console.log('Profile successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.password}</td>
                <td>
                    <Link className="edit-link" to={"/edit-profile/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteProfile} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}