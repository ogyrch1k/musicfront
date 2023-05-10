import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import PlaylistService from "../API/PlaylistService";
import PlaylistList from "../components/PlaylistList"
import {usePlaylists} from "../hooks/usePlaylists";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PlaylistForm from "../components/PlaylistForm"

function Playlists(){
 const [playlist, setPlaylist]=useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPlaylists = usePlaylists(playlist,filter.sort, filter.query);
    const[fetchPlaylist, isLoading, error]=useFetching(async ()=>{
        const response = await PlaylistService.getAll();
        setPlaylist(response.data)
    })

    useEffect(()=>{
        fetchPlaylist()
    },[])

    return(
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать плейлист
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PlaylistForm />
            </MyModal>
            {error &&
                <h1>Произошла ошибка ${error}</h1>
            }
            <PlaylistList playlists={sortedAndSearchedPlaylists} title="Плейлисты"/>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
        </div>
    )
}

export default Playlists
