import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TrackService from "../API/TrackService"
import TrackItem from "./TrackItem";
import PlaylistService from "../API/PlaylistService";
import {AuthContext} from "../context";

const TracksOfAlbumList =(album,title,id)=>{
    const [tracks,setTracks] = useState([])
    const [playlists,setPlaylists]=useState([])
    const {arr,setArr}=useContext(AuthContext)
    const [fetchTracks, isTracksLoading, error] = useFetching( async(id)=>{
        const response = await TrackService.getTracksOfAlbum(id);
        setTracks(response.data)
    })
    const[allplaylist, isload,erro]=useFetching(async()=>{
        const request = await PlaylistService.getAll();
        setPlaylists(request.data)
    })

    useEffect(()=>{
        fetchTracks(album.album)
        allplaylist()
    },[])
    const test =playlists.map(item=>{
        const play={};
        play.value=item.id
        play.name = item.nameOfPlaylist
        return play
    })
    return(
        <div><TransitionGroup>
                {tracks.map((track, index) =>
                    <CSSTransition
                        key={track.id}
                        timeout={500}
                        classNames="track"
                    >
                        <TrackItem user={id} number={index + 1} track={track} playlist={test}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default TracksOfAlbumList;
