import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import Cookie from 'js-cookie'
import {useNavigate} from "react-router-dom";
import PlaylistForm from "../components/PlaylistForm";
import ExecutorAddForm from "../components/ExecutorAddForm";
import ExecutorDeleteForm from "../components/executorDeleteForm";
import ExecutorService from "../API/ExecutorService";
import GenreServise from "../API/GenreServise";
import AlbumAddForm from "../components/AlbumAddForm";
import AlbumService from "../API/AlbumService";
import AlbumDeleteform from "../components/AlbumDeleteform";
import AddAlbumToExecutor from "../components/AddAlbumToExecutor";
import TrackAddForm from "../components/TrackAddForm";
import TrackService from "../API/TrackService";
import TrackDeleteForm from "../components/TrackDeleteForm";
import AddTrackToAlbum from "../components/AddTrackToAlbum";
import {AuthContext} from "../context";

const AdminPage=()=>{
    const {reload, setReload} = useContext(AuthContext);
    const router = useNavigate()
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal6, setModal6] = useState(false);
    const [modal7, setModal7] = useState(false);
    const [modal8, setModal8] = useState(false);
    const [modal9, setModal9] = useState(false);
    const [moda20, setModa20] = useState(false);
    const [executor,setExecutor] = useState([])
    const [album,setAlbum]=useState([])
    const [track,setTrack]=useState([])
    const [genre,setGenre]=useState([])
    const[allExecutor,isLoad,err]=useFetching(async()=>{
        const request = await ExecutorService.getAllExecutor()
        setExecutor(request.data)
        return request
    })

    const [allAlbum,isLoad2,err2]=useFetching(async ()=>{
        const request = await AlbumService.getAll()
        setAlbum(request.data)
    })

    const [allTrack,isLoad3,err3]=useFetching(async ()=>{
        const request = await TrackService.allTracks()
        setTrack(request.data)
    })
    const [allGenres,isLoad4,err4]=useFetching(async ()=>{
        const request = await GenreServise.getAllGenres()
        setGenre(request.data)
    })
    useEffect(()=>{
        if(Cookie.get('role')!='admin'){
            router('/playlists')
        }
        allExecutor()
        allAlbum()
        allTrack()
        allGenres()
        console.log("qqqqqqqqqqqqqqqqqqq")
    },[])

    const test =executor.map(item=>{
        const exe={};
        exe.value=item.id
        exe.name = item.nameOfExecutor
        return exe
    })

    const test2=album.map(item=>{
        const al={};
        al.value=item.id
        al.name=item.nameOfAlbum
        return al
    })

    const test3=track.map(item=>{
        const al={};
        al.value=item.id
        al.name=item.nameOfTrack
        return al
    })

    const test4=genre.map(item=>{
        const al={};
        al.value=item.id
        al.name=item.nameOfGenre
        return al
    })
    return(
        <div className="AdminPage">

            <h1>Исполнители</h1>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <ExecutorAddForm genres={test4}/>
            </MyModal>
            <MyButton style={{marginTop: 30}} onClick={() => setModal2(true)}>
                удалить
            </MyButton>
            <MyModal visible={modal2} setVisible={setModal2}>
                <ExecutorDeleteForm executor={test}/>
            </MyModal>
            {/* <MyButton style={{marginTop: 30}} onClick={() => setModa20(true)}>
                Изменить
            </MyButton>
            <MyModal visible={moda20} setVisible={setModa20}>
                <ExecutorEditForm id={params.id}/>
            </MyModal> */}
            {/*<MyButton style={{marginTop: 30}} onClick={() => setModal3(true)}>*/}
            {/*    Изменить*/}
            {/*</MyButton>*/}
            {/*<MyModal visible={modal3} setVisible={setModal3}>*/}
            {/*    <ExecutorDeleteForm executor={test}/>*/}
            {/*</MyModal>*/}
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Альбомы</h1>

            <MyButton style={{marginTop: 30}} onClick={() => setModal4(true)}>
                Создать
            </MyButton>
            <MyModal visible={modal4} setVisible={setModal4}>
                <AlbumAddForm genres={test4}/>
            </MyModal>
            <MyButton style={{marginTop: 30}} onClick={() => setModal5(true)}>
                удалить
            </MyButton>
            <MyModal visible={modal5} setVisible={setModal5}>
                <AlbumDeleteform album={test2} />
            </MyModal>
            <MyButton style={{marginTop: 30}} onClick={() => setModal6(true)}>
                добавить к исполнителю
            </MyButton>
            <MyModal visible={modal6} setVisible={setModal6}>
                <AddAlbumToExecutor executor={test} album={test2}/>
            </MyModal>

        </div>
    )
}
export default AdminPage
