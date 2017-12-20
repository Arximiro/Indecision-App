import React from 'react';

const Option = (props) => {
    return (
        <div>
            <ul>
            <li>{props.optionText}</li>
            <button
              onClick={(e) => {props.handleDeleteOption(props.optionText)}}
            >
            Remove
            </button>
            </ul>
        </div>
    );
};

export default Option;