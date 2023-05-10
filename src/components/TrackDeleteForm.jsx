import React, {useContext, useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import TrackService from "../API/TrackService";

const TrackDeleteForm=(props)=>{
    const [value,setValue]=useState()
    const [delet,isload,err]=useFetching(async (id)=>{
        const request =await TrackService.delTrack(id)
        if(request.status===200){
            alert("удалено")
            return request
        }
    })
    const del=(e)=>{
        e.preventDefault()
        delet(value)
    }
    return(
        <form>
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                options={props.track
                }/>
            <MyButton onClick={del}> удалить</MyButton>
        </form>
    )
}

export default TrackDeleteForm
