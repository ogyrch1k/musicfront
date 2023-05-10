import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import Cookie from 'js-cookie'
import MySelect from "./UI/select/MySelect";

const AddTrackToplaylistform=(props)=>{

    const [value,setValue]=useState()

    const[add,load,err]=useFetching(async (idPlaylist,IdTrack)=>{
        const request = await PlaylistService.addTrackToPlaylist(idPlaylist,IdTrack)
        if(request.status===200){
            alert("добавлено")
            return request
        }

    })
    const addTrack = (e) => {
        e.preventDefault()
        add(value,props.id)
    }

    return(
        <form>
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                options={props.playlist}
            />
            <MyButton onClick={addTrack} >добавить трек</MyButton>
        </form>
    )
}

export default AddTrackToplaylistform
