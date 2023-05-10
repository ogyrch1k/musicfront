import React from 'react';
import cx from 'classnames';
import classes from './MyInput.module.css';


class MyInput extends React.Component{
    render() {
        return (
        <input ref={this.props.ref} className={cx(
            'w-full',
            'bg-surface0/40',
            'border-overlay0',
            'active:border-lavender',
            'focus:border-lavender',
            'py-2 px-4',
            'border-2',
            'rounded-md',
            'outline-none',
            'transition-colors',
        )} {...this.props}/>
    );
    }
}
export default MyInput;
