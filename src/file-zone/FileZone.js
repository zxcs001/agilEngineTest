import React, { Component } from 'react';
import './FileZone.css';

export default class FileZone extends Component {
    render() {
      return (
        <div id="file-zone">
            <div id="file">
                {this.props.mockText}
            </div>
        </div>        
      );
    }
}
