import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import AlbumService from "../API/AlbumService";
import TracksOfAlbumList from "../components/TracksOfAlbumList";
import TrackService from "../API/TrackService"
import Player from "../components/UI/Player/Player";
import {AuthContext} from "../context";
import MyButton from "../components/UI/button/MyButton";
import Cookie from "js-cookie";
import UserService from "../API/UserService";
import cx from 'classnames';
import ExecutorService from "../API/ExecutorService";
const AlbumIdPage=()=>{
    const params = useParams()
    const router = useNavigate()
    const role=Cookie.get('role')
    const [tracks,setTracks] = useState([])
    const [image,setImage]=useState()
    const [audio,setAudio]=useState()
    const [album,setAlbum] =useState({})
    const [id, setId] = useState(0);
    const {arr,setArr}=useContext(AuthContext);
    const {name,setName}=useContext(AuthContext);
    const[fetchImage, isImageLoading, ImageError]=useFetching(async(id)=>{
        const response = await AlbumService.getImage(id);
        setImage(response.data)
    })
    const [fetchAlbumById, isLoading, error] = useFetching(async (id) => {
        const response = await AlbumService.getAlbum(id)
        setAlbum(response.data);
    })

    const [fetchAUdio, isaudio, error2] = useFetching(async (id) => {
        const response = await await TrackService.getSong(id)
        setAudio(response.data);
    })

    const [fetchTracks, isTracksLoading, erro] = useFetching( async(id)=>{
        const response = await TrackService.getTracksOfAlbum(id);
        setTracks(response.data)
    })
    const [fetchTracks2, isTracksLoading2, erro2] = useFetching( async(id)=>{
        const response = await TrackService.getTracksById(id);
        console.log(response.data)
        setName(response.data)
    })
    const [fetchUser,isLoadin, err] = useFetching(async (login)=>{
        const response = await UserService.getUser(login);
        if(response.status===200){
            console.log(response.data.id)
            setId(response.data.id);
        }


    })
    const [remo,isload1,errr1]=useFetching(async (idOfAlbum)=>{
        const request =await AlbumService.delAlbum(idOfAlbum)
        if(request.status===200){
            router('/executors')
            return request
        }
        return request

    })
    let login
    useEffect(()=>{
        fetchImage(params.id)
        fetchAlbumById(params.id)
        fetchAUdio(1)
        fetchTracks(params.id)
        login=Cookie.get('login')
        console.log(login)
        fetchUser(login)
        console.log(id)
    },[])
    var a=[]
    var names=""
    const test2=tracks.map(item=>{
        names=names.concat("id=",item.id,"&");
        return names
    });
    const test=tracks.map(item=>{
        a="/getSong?id="+item.id
        return a
    })
    function play() {
        setArr(test)
        Cookie.set('arr', test, {secure: true})
        fetchTracks2(names)
        console.log(names)
    }
    function remove(){
        remo(params.id)
    }

    return(
        <div className="App">
            <h1>Альбом {album.nameOfAlbum}</h1>
            <hr/>
                <table>
                    <tr>
                        <td>   <img className={cx('size:h-26 w-26 text-2xl',
                            'rounded-full',
                            'bg-cover',
                            'bg-center',
                            'bg-no-repeat',
                            'border:visible',
                            'background:mantle',
                            'border-2 border-lavender'
                        )} src={'data:image/jpeg;base64, '+image}/></td>
                        <td><MyButton onClick={play}> Воспроизвести</MyButton></td>
                        <td>
                            {role ==='admin' &&
                                <MyButton onClick={remove}>
                                    Удалить альбом
                                </MyButton>
                            }
                        </td>
                    </tr>
                </table>


            <hr/>
            <h3>О альбоме: {album.descriptionText}</h3>
            <h5>Дата создания {album.dateOfCreate}</h5>

            <hr/>
            <TracksOfAlbumList user={id} album={params.id} title="Треки альбома"/>
        </div>
    )
}

export default AlbumIdPage;
