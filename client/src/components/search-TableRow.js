import React, { Component } from 'react';

export default class SearchTableRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.genres}</td>
            </tr>
        );
    }
}