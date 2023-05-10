import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import ExecutorService from '../API/ExecutorService';

import AlbumList from "../components/AlbumList";
import MyButton from "../components/UI/button/MyButton";
import Cookie from "js-cookie";
import MyModal from "../components/UI/MyModal/MyModal";
import ExecutorAddForm from "../components/ExecutorAddForm";
import ExecutorEditForm from "../components/ExecutorEditForm";
import AlbumAddForm from "../components/AlbumAddForm";
import AlbumService from "../API/AlbumService";
import GenreServise from "../API/GenreServise";
import TrackService from "../API/TrackService";
import cx from "classnames";
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
const ExecutorIdPage =()=>{
    const router = useNavigate()
    const forceUpdate = useForceUpdate();
    const role=Cookie.get('role')
    const [modal, setModal] = useState(false);
    const [modal4, setModal4] = useState(false);
    const params = useParams()
    const [executor, setExecutor] = useState({});
    const [image,setImage]=useState()
    const [t,setT]=useState()
    const [ref1,setRef]=useState(0)
    const [genre,setGenre]=useState([])
    const [fetchExecutorById, isLoading, error] = useFetching(async (id) => {
        const response = await ExecutorService.getExecutor(id)
        setExecutor(response.data);
    })
    const[fetchImage, isImageLoading, ImageError]=useFetching(async(id)=>{
        const response = await ExecutorService.getImage(id);
        setImage(response.data)
    })
    const [allGenres,isLoad4,err4]=useFetching(async ()=>{
        const request = await GenreServise.getAllGenres()
        setGenre(request.data)
    })
    const [add,isload,errr]=useFetching(async (idOfExecutor,idOfUser)=>{
        const request =await ExecutorService.addExecutorToUser(idOfExecutor,idOfUser)
        if(request.status===200){
            return request
        }
        return request

    })

    const [remo,isload1,errr1]=useFetching(async (idOfExecutor)=>{
        const request =await ExecutorService.delExecutor(idOfExecutor)
        if(request.status===200){
            router('/executors')
            return request
        }
        return request

    })
    const test4=genre.map(item=>{
        const al={};
        al.value=item.id
        al.name=item.nameOfGenre
        return al
    })
    const refresh=(ref1)=>{
        setRef(ref1)

    }
    useEffect(()=>{
        fetchImage(params.id)
        fetchExecutorById(params.id)
        allGenres()
        if(executor.disbandmentDate=='0002-11-30'){
            setT('---')
        }
        else {
            setT(executor.disbandmentDate)
        }
    },[ref1])
    function addToUser(){
        add(params.id,4)
    }
    function remove(){
        remo(params.id)
    }
    return(
        <div className="App">
            <h1>Исполнитель {executor.nameOfExecutor}</h1>

            <hr/>
            <table>
                <tr>
                    <td>    <img className={cx('size:h-26 w-26 text-2xl',
                        'rounded-full',
                        'bg-cover',
                        'bg-center',
                        'bg-no-repeat',
                        'border:visible',
                        'background:mantle',
                        'border-2 border-lavender'
                    )} src={'data:image/jpeg;base64, '+image}/></td>
                    <td> <MyButton onClick={addToUser} > Добавить в коллекцию </MyButton></td>
                    <td>{role==='admin' && <MyButton  onClick={() => setModal(true)}> Редактировать </MyButton> }</td>
                    <td>                {
                        role==='admin' &&
                        <MyButton  onClick={() => setModal4(true)}>
                            Новый альбом
                        </MyButton>}</td>
                    <td>
                        {role ==='admin' &&
                            <MyButton onClick={remove}>
                                Удалить исполнителя
                            </MyButton>
                        }
                    </td>
                </tr>
            </table>


            <hr/>
            <div className="qwe">

                <MyModal visible={modal} setVisible={setModal}>
                    <ExecutorEditForm executor={executor} image={image}/>
                </MyModal>


                <MyModal visible={modal4} setVisible={setModal4}>
                    <AlbumAddForm genres={test4} executor={executor} resresh={refresh} ref1={ref1}/>
                </MyModal>


            </div>
            <h3>О исполнителе: {executor.descriptionExt}</h3>
            <h5>Дата формирования {executor.dateOfFormation}</h5>
            <h5>Дата распада {t}</h5>

            <hr/>
            <AlbumList executor={params.id} title="Альбомы"/>
        </div>
    )
}

export default ExecutorIdPage;

