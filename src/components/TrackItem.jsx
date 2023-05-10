import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import TrackService from "../API/TrackService";
import MyButton from "./UI/button/MyButton";
import {AuthContext} from "../context";
import MyModal from "./UI/MyModal/MyModal";
import AddTrackToplaylistform from "./addTrackToplaylistform";
import AlbumService from "../API/AlbumService";
import UserService from "../API/UserService";

const TrackItem=(props)=>{
    const {id, setId} = useContext(AuthContext);
    const {arr,setArr}=useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [add,isload,errr]=useFetching(async (idOfAlbum,idOfUser)=>{
        const request =await TrackService.addTrackToUser(idOfAlbum,idOfUser)
        if(request.status===200){
            return request
        }
        return request

    })

    const [remove,isload1,errr1]=useFetching(async (idOfAlbum,idOfUser)=>{
        const request =await TrackService.removeTrackFromUser(idOfAlbum,idOfUser)
        if(request.status===200){
            return request
        }
        return request

    })
    function r(id){
        setId(id)
    }
    function play(){
        let a ="/getSong?id="+props.track.id
        setArr([a])
    }
    function addToUser(){

        add(props.track.id,4)
    }
    return(
        <div className="track" >

            <MyModal visible={modal} setVisible={setModal}>
                <AddTrackToplaylistform id={props.track.id} playlist={props.playlist}/>
            </MyModal>
            <div className="track__content" onClick={play}>
                <p1>{props.number}</p1>
                <p1>    </p1>
                <strong>{props.track.nameOfTrack}</strong>
            </div>
            <MyButton onClick={() => setModal(true)}>
                добавить в плейлист
            </MyButton>
            <MyButton onClick={addToUser}>
                добавить в коллекцию
            </MyButton>
        </div>
    )
}

export default TrackItem
