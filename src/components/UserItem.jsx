import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useHistory} from 'react-router-dom';
const UserItem=(props)=>{

    return (
        <div className="user">
                 <div className="user__content">
                <strong>{props.user}</strong>                
            </div>
        </div>
    )
}
export default UserItem;