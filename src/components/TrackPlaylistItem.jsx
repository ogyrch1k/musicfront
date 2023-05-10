import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import TrackService from "../API/TrackService";
import MyButton from "./UI/button/MyButton";
import {AuthContext} from "../context";
import MyModal from "./UI/MyModal/MyModal";
import AddTrackToplaylistform from "./addTrackToplaylistform";
import PlaylistService from "../API/PlaylistService";

const TrackPlaylistItem=(props)=>{
    const {id, setId} = useContext(AuthContext);
    const [del,islod,err]=useFetching(async (idPlaylist,IdTrack)=>{
        const response = await PlaylistService.delTrackToPlaylist(idPlaylist,IdTrack)

        return response.data
    })
    function r(id){
        setId(id)
    }
    return(
        <div className="track">
            <div className="track__content">
                <strong>{props.track.nameOfTrack}</strong>
            </div>

            <MyButton style={{marginTop: 30}} onClick={()=>del(props.playlist.id,props.track.id )}>
                Удалить
            </MyButton>
        </div>
    )
}

export default TrackPlaylistItem
