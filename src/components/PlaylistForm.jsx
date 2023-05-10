import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import PlaylistData from "../data/PlaylistData";
import Cookie from 'js-cookie'
import {useNavigate} from "react-router-dom";
const PlaylistForm=()=>{
    const router = useNavigate()
    const [playlist, setPlaylist]=useState({nameOfPlaylist:' ',descriptionText: ''})
   let login
    const[newPlaylist,isload,error]=useFetching(async (myJson)=>{
        login = Cookie.get('login')
        const response = await PlaylistService.createPaylist(myJson);
        const res =await PlaylistService.addPlaylistToUser(response.data.id,login)
        if(res.status===200 && response.status===200){
            router("/playlists/"+response.data.id)
            return res
        }
    })

    const addNewPlaylist = (e) => {
        e.preventDefault()
        if(playlist.descriptionText==''||playlist.nameOfPlaylist==''){
            alert("заполните все поля")
            
        } else{
            const request = new PlaylistData(null,playlist.nameOfPlaylist,playlist.descriptionText)
            const myJSON = JSON.stringify(request);
            newPlaylist(myJSON) 
        }           
      
    }
    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={playlist.nameOfPlaylist}
                onChange={e => setPlaylist({...playlist, nameOfPlaylist: e.target.value})}
                type="text"
                placeholder="Название плейлиста"
            />
            {/*Неуправляемый\Неконтролируемый компонент*/}
            <MyInput
                value={playlist.descriptionText}
                onChange={e => setPlaylist({ ...playlist, descriptionText: e.target.value})}
                type="text"
                placeholder="Описание плейлиста"
            />
            <MyButton onClick={addNewPlaylist}>Создать плейлист</MyButton>
        </form>
    );
}

export default PlaylistForm
