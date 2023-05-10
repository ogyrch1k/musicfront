import React, {useEffect, useContext,useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import TrackOfPlaylistList from "../components/TrackOfPlaylistList";
import {AuthContext} from "../context";
import TrackService from "../API/TrackService";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PlaylistEditForm from "../components/PlaylistEditForm"

const PlayListIdPage =()=>{
    const params = useParams()
    const [modal, setModal] = useState(false);
    const [play,setPlay] = useState({})
    const [tracks,setTracks] = useState([])
    const {arr,setArr}=useContext(AuthContext);
    const {name,setName}=useContext(AuthContext);
    const[playlist, isLoad, error]=useFetching(async (id)=>{
        const response = await PlaylistService.getPlaylist(id)
        setPlay(response.data)
    })
    const [fetchTracks, isTracksLoading, erro] = useFetching( async(id)=>{
        const response = await TrackService.getTracksOfPLaylist(id);
        setTracks(response.data)
    })
    const [fetchTracks2, isTracksLoading2, erro2] = useFetching( async(id)=>{
        const response = await TrackService.getTracksById(id);
        setName(response.data)
    })
    const [delPlaylist, isComLoading, comError]= useFetching(async (id)=>{
        const resp = await PlaylistService.delPlaylist(id)
        if(resp.status===200){
            alert("удалено")
            return resp
        }
        else{
            alert("ошибка")
        }
    })
    useEffect(()=>{
        playlist(params.id)
        fetchTracks(params.id)
    },[]);
    var names=""
    var a=[]
    const test=tracks.map(item=>{
        a="/getSong?id="+item.id
        return a
    });
    const test2=tracks.map(item=>{
        names=names.concat("id=",item.id,"&");
        return names
    });
    function playy() {
        setArr(test)
        fetchTracks2(test2)
        console.log(name)
    };
    function editt(){

    };
    function del(){
        delPlaylist(play.id)
    }
    return(
        <div className="App from-mantle to-crust outline-pink">
            <MyModal visible={modal} setVisible={setModal}>
                <PlaylistEditForm id={params.id}/>
            </MyModal>
            <h1 className ="from-pink to-mauve">Название: {play.nameOfPlaylist}</h1>
            <hr/>
            <h3>Описание: {play.descriptionText}</h3>
            <MyButton onClick={playy} className="button bg-lavender hover:bg-mauve active:bg-mauve/75"> Воспроизвести</MyButton>
            <MyButton style={{marginTop: 30}} className="button bg-lavender hover:bg-mauve active:bg-mauve/75" onClick={() => setModal(true)}>
                Изменить
            </MyButton>

            <MyButton onClick={del} className="button bg-lavender hover:bg-mauve active:bg-mauve/75">
                Удалить
            </MyButton>
            <hr/>
            <TrackOfPlaylistList playlist={params.id} title="Треки плейлиста"/>
        </div>
    )
}

export default PlayListIdPage
