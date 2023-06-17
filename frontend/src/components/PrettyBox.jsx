import React from 'react';
import './PrettyBox.scss';

const PrettyBox = (props) => {

    const content = props.content;
    const timestamp = props.timestamp;
    const status = props.status;

    return <div className = "boxContainer">
        <div className = {`sideBar ${status}`}>&nbsp;</div>
        <div className = "textContainer">
            <div className = "timestamp">{timestamp}</div>
            <div className = "boxContent">
                {content}
            </div>
        </div>
        </div>
}

export default PrettyBox;