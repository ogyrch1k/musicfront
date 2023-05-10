import React, {useEffect,useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import PlaylistData from "../data/PlaylistData";
import Cookie from 'js-cookie'
import {useHistory} from "react-router-dom";
const PlaylistEditForm=(props)=>{
    const [playlist, setPlaylist]=useState({nameOfPlaylist:' ',descriptionText: ''})
    const [play,setPlay] = useState({})
    let login
    const[editPlay,isload,error]=useFetching(async (myJson)=>{
        
        const response = await PlaylistService.editPlaylist(myJson);
       
        if(response.status===200 ){
            window.location.reload();
            return response
        }
    })

    const[playli, isLo, erro]=useFetching(async (id)=>{
        const response = await PlaylistService.getPlaylist(id)
        setPlay(response.data)
    })
    const editPlaylist = (e) => {
        e.preventDefault()
        const request = new PlaylistData(props.id,playlist.nameOfPlaylist,playlist.descriptionText)
        const myJSON = JSON.stringify(request);
        editPlay(myJSON)
    }
    useEffect(()=>{
        console.log(props.id)
        playli(props.id)
    },[]);
    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={playlist.nameOfPlaylist}
                onChange={e => setPlaylist({...playlist, nameOfPlaylist: e.target.value})}
                type="text"
                placeholder={play.nameOfPlaylist}
            />
            {/*Неуправляемый\Неконтролируемый компонент*/}
            <MyInput
                value={playlist.descriptionText}
                onChange={e => setPlaylist({ ...playlist, descriptionText: e.target.value})}
                type="text"
                placeholder={play.descriptionText}
            />
            <MyButton onClick={editPlaylist}>изменить плейлист</MyButton>
        </form>
    );
}

export default PlaylistEditForm
