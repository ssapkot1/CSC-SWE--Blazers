import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
export default class SearchTableRow extends Component {
    constructor(props) {
        super(props);
       
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.genres}</td>
            </tr>
        );
    }
}