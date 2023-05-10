import React, { useEffect,useState } from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ExecutorService from "../API/ExecutorService";
import AlbumService from "../API/AlbumService";

const AlbumItem=(props)=>{
    const router = useNavigate()
    const [image,setImage]=useState()

    const[fetchImage, isImageLoading, ImageError]=useFetching(async(id)=>{
        const response = await AlbumService.getImage(id);
        setImage(response.data)
    })

    useEffect(()=>{
        fetchImage(props.album.id)
    },[props.album.id])

    return(
        <div className="album" onClick={() => router.push(`/albums/${props.album.id}`)}>
            <div className="album__content">
                <strong>{props.album.nameOfAlbum}</strong>
                <img src={'data:image/jpeg;base64, '+image}/>
            </div>
            <div className="album__btns">
                <MyButton >
                    Добавить в коллекцию
                </MyButton>
            </div>
        </div>
    )
};

export default AlbumItem;
