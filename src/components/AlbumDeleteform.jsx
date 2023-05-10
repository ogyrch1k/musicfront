import React, {useContext, useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import AlbumService from "../API/AlbumService";

const AlbumDeleteform=(props)=>{
    const [value,setValue]=useState()
    const [delet,isload,err]=useFetching(async (id)=>{
        const request =await AlbumService.delAlbum(id)
        if(request.status===200){
            alert("удалено")
            return request
        }
    })
    const del=(e)=>{
        e.preventDefault()
        delet(value)
    }
    return(
        <form>
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                options={props.album
                }/>
            <MyButton onClick={del}> удалить</MyButton>
        </form>
    )
}

export default AlbumDeleteform
