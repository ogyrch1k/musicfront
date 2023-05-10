import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import TrackService from "../API/TrackService";
import TrackData from "../data/TrackData";

const TrackAddForm=()=>{
    const [fileValue,setfileValue] = useState(undefined);
    const [track,setTrack] = useState({nameOfTrack:''})
    const [addTrack,isloD,err]=useFetching(async (myJson,file)=>{
        const response= await TrackService.addTrack(myJson,file)
        if(response.status===200){
            alert("трек добавлен")
            return response
        }


    })
    const addNewTrack=(e)=>{
        e.preventDefault()
        const trackData = new TrackData(track.nameOfTrack)
        const myJSON = JSON.stringify(trackData);
        addTrack(myJSON,fileValue)
    }
    return(
        <form>
            <MyInput
                value={track.nameOfTrack}
                onChange={e => setTrack({...track, nameOfTrack: e.target.value})}
                type="text"
                placeholder="Название трека"
            />
            <MyInput onChange={e=>{setfileValue(e.target.files[0])}} type="file" placeholder="Введите ник"/>
            <MyButton onClick={addNewTrack}>добавить</MyButton>
        </form>
    )
}
export default TrackAddForm
