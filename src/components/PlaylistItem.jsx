import React, { useEffect,useState } from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";

const PlaylistItem =(props)=>{
    const router = useNavigate()


    return (
        <div className="playlist from-mantle to-crust outline-pink" onClick={() => router(`/playlists/${props.playlist.id}`)}>
            <div className="playlist__content">
                <h3 className ="from-pink to-mauve">{props.playlist.nameOfPlaylist}</h3>
                <div>
                    {props.playlist.descriptionText}
                </div>
            </div>

        </div>
    );
}
export default PlaylistItem
