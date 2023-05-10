import React from 'react';
import classes from './MyA.module.css'

const MyA = ({children, ...props}) => {
    return(
        <a {...props} className={classes.myA}>
            {children}
        </a>
    )
}
export default MyA
