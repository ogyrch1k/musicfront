import React, {useContext, useEffect, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import Cookie from 'js-cookie'
import AlbumService from "../API/AlbumService";
import dateOfCreate from "../data/dateOfCreate";
import albumData from "../data/AlbumData"
import genreData from "../data/GenreData"
import GenreServise from "../API/GenreServise";
import MySelect from "./UI/select/MySelect";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const AlbumAddForm=(props)=>{
    const router = useNavigate()
    const [value,setValue]=useState()
    const[album,setAlbum]=useState({nameOfAlbum:'',descriptionText:'',dateOfFormationYear:'',dateOfFormationMonth:'',dateOfFormationDay:''})
    const [fileValue,setfileValue] = useState(undefined);
    const [add,isload,errr]=useFetching(async (idOfAlbum,idOfExecutor)=>{
        const request =await AlbumService.addAlbumExecutor(idOfAlbum,idOfExecutor)
        if(request.status===200){
            return request
        }
        return request

    })
    const [addAlbum,isloD,err]=useFetching(async (myJson,file)=>{
        const response= await AlbumService.createAlbum(myJson,file)
        if(response.status===200){
            console.log(myJson)
            add(response.data,props.executor.id)
            router("/albums/"+response.data)
            return response
        }

        return response

    })

    const addNewAlbum= (e) => {
        e.preventDefault()
        const DateOfFormation= new dateOfCreate( parseFloat(album.dateOfFormationYear), "1", "1")
        const AlbumData = new albumData(null,album.nameOfAlbum, DateOfFormation,album.descriptionText,new genreData(value,props.genres[value].name))
        const myJSON = JSON.stringify(AlbumData);
        addAlbum(myJSON,fileValue)
    }

    return(
        <div>
        <form>
            <MyInput
                value={album.nameOfAlbum}
                onChange={e => setAlbum({...album, nameOfAlbum: e.target.value})}
                type="text"
                placeholder="Название альбома"
            />
            <MyInput
                value={album.descriptionText}
                onChange={e => setAlbum({...album, descriptionText: e.target.value})}
                type="text"
                placeholder="описание альбома"
            />
            <MyInput
                value={album.dateOfFormationYear}
                onChange={e => setAlbum({...album, dateOfFormationYear: e.target.value})}
                type="number"
                placeholder="год создания"
            />
            <MySelect
                value={value}
                onChange={value=>setValue(value)}
                defaultValue={"Выберите жанр"}
                options={props.genres
                }/>
            <MyInput onChange={e=>{setfileValue(e.target.files[0])}} type="file" placeholder="Введите ник"/>
            <MyButton onClick={addNewAlbum}>Создать альбом</MyButton>
        </form>
        </div>
    )
}
export default AlbumAddForm
