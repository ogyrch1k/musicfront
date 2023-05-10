import React, {useContext, useState, useEffect} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import AlbumService from "../API/AlbumService";

const AddAlbumToExecutor=(props)=>{
    const [value,setValue]=useState()
    const [value2,setValue2]=useState()
    const [add,isload,err]=useFetching(async (idOfAlbum,idOfExecutor)=>{
        const request =await AlbumService.addAlbumExecutor(idOfAlbum,idOfExecutor)
        if(request.status===200){
            alert("добавлено")
            return request
        }
        return request

    })
    const del=(e)=>{
        e.preventDefault()
        add(value,value2)
    }
    return(
        <form>
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                defaultValue={"Выберите альбом"}
                options={props.album
                }/>
            <MySelect
                value={value2}
                onChange={value=>setValue2(value)}
                defaultValue={"Выберите исполнителя"}
                options={props.executor
                }/>
            <MyButton onClick={del}>добавить</MyButton>
        </form>
    )
}
export default AddAlbumToExecutor
