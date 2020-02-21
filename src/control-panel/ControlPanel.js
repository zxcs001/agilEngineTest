import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {

    styleUpdate = (index, style) => {
        return(index, style);
    }

    render() {
        return (
            <div id="format-actions">
                <button className="format-action" type="button" onClick ={() => this.styleUpdate('b')}><b>B</b></button>
                <button className="format-action" type="button" onClick ={() => this.styleUpdate('i')}><i>I</i></button>
                <button className="format-action" type="button" onClick ={() => this.styleUpdate('u')}><u>U</u></button>
            </div>
        );
    }
}

export default ControlPanel;
