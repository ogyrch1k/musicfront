import React, { useEffect,useState } from 'react';
import {useFetching} from "../hooks/useFetching";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TrackService from "../API/TrackService"
import TrackItem from "./TrackItem";
import MyButton from "./UI/button/MyButton";
import PlaylistService from "../API/PlaylistService";
import TrackPlaylistItem from "./TrackPlaylistItem";


const TrackOfPlaylistList =(playlist,title)=>{
    const [tracks,setTracks] = useState([])
    const [playlists,setPlaylists]=useState([])
    const [fetchTracks, isTracksLoading, error] = useFetching( async(id)=>{
        const response = await TrackService.getTracksOfPLaylist(id);
        setTracks(response.data)
    })
    const[allplaylist, isload,erro]=useFetching(async(id)=>{
        const request = await PlaylistService.getPlaylist(id);
        setPlaylists(request.data)
    })
    const play={};
    useEffect(()=>{
        fetchTracks(playlist.playlist)
        allplaylist(playlist.playlist)
        console.log(playlists)
    },[])

    return(
        <div>
            <p style={{textAlign: 'center'}}>
                {playlist.title}
            </p>
            <TransitionGroup>
                {tracks.map((track, index) =>
                    <CSSTransition
                        key={track.id}
                        timeout={500}
                        classNames="track"
                    >
                        <TrackPlaylistItem number={index + 1} track={track} playlist={playlists}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default TrackOfPlaylistList;
