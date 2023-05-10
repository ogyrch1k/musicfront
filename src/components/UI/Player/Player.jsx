import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Cookie from "js-cookie";
import {useFetching} from "../../../hooks/useFetching";
import TrackService from "../../../API/TrackService";

const Player =()=>{
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [path,setPath] =useState()
    const {id, setId} = useContext(AuthContext);
    const {arr,setArr}=useContext(AuthContext)
    const {name,setName}=useContext(AuthContext)
    const [tracks,setTracks] = useState("")
    const [currentSong, setCurrentSong] = useState(0);
    const [currentName, setCurrentName] = useState(0);

    let songg;
    let nameOfTrack;
    try{
        //fetchTracks(name[currentSong]);
        nameOfTrack =name[currentSong].nameOfTrack;
    }catch (e){

    }
    try{

         songg = arr[currentSong];
    }catch (e){

    }
    const {song,setSong} = useContext(AuthContext)
    let i=0;

    useEffect(()=>{
        setPath(arr)
      //  document.getElementsByClassName("audio").play();
    },[arr])
    if(!isAuth) return null;
    return(
        <div className="player from-mantle to-crust outline-pink text-pink bg-pink/50">
            {/*<audio className="audio"*/}
            {/*    controls*/}
            {/*       preload="auto"*/}
            {/*    src={path}>*/}
            {/*    Your browser does not support the*/}
            {/*    <code>audio</code> element.*/}
            {/*</audio>*/}
            <AudioPlayer
                autoPlay
                src={songg}
                header={nameOfTrack}
                onPlay={e => {console.log("onPlay");console.log(name)} }
                onEnded={e=>{
                    console.log("onEnded");
                    if(arr.length-1>currentSong)
                    {
                        // console.log(arr.length)
                        // console.log(" ")
                        // console.log(currentSong)
                        setCurrentSong(i => i + 1)
                    }
                }}
                // other props here
            />
        </div>
    )
}
export default Player
