import React, { useEffect,useState } from 'react';
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import AlbumService from "../API/AlbumService";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import AlbumItem from "../components/AlbumItem"
import Player from "./UI/Player/Player";


const AlbumList =(props)=>{
    const [album,setalbum] =useState([])
    const[fetchAlbum, isAlbumLoading, ImageError]=useFetching(async(id)=>{
        const response = await AlbumService.getAlbumsOfExecutor(id);
        setalbum(response.data)
    })

    useEffect(()=>{
        fetchAlbum(props.executor)
    },[])

    return(
        <div>
            <p style={{textAlign: 'center'}}>
                {props.title}
            </p>
            <TransitionGroup>
                {album.map((album, index) =>
                    <CSSTransition
                        key={album.id}
                        timeout={500}
                        classNames="album"
                    >
                        <AlbumItem  number={index + 1} album={album} />

                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
};

export default AlbumList;
