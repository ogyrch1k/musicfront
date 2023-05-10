import React from 'react';
import cx from 'classnames';
import classes from './MyButton.module.css';


class MyButton extends React.Component{
    render() {
            return (
        <button {...this.props}>
            {this.props.children}
        </button>
    );
    }
}

export default MyButton;
