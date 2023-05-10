import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import MySelect from "./UI/select/MySelect";
import TrackService from "../API/TrackService";

const AddTrackToAlbum =(props)=>{
    const [value,setValue]=useState()
    const [value2,setValue2]=useState()

    const [add,isload,err]=useFetching(async (idOfTrack,idOfAlbum)=>{
        const request =await TrackService.addTrackToAlbum(idOfTrack,idOfAlbum)
        if(request.status===200){
            alert("добавлено")
            return request
        }
    })

    const del=(e)=>{
        e.preventDefault()
        add(value,value2)
    }

    return(
        <form>
            <p>трек</p>
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                options={props.track
                }/>
            <p>альбом</p>
            <MySelect
                value={value2}
                onChange={value=>setValue2(value)}
                options={props.album
                }/>
            <MyButton onClick={del}>добавить</MyButton>
        </form>
    )
}

export default AddTrackToAlbum
