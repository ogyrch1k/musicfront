import React, { useEffect,useState } from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import ExecutorService from '../API/ExecutorService';
import cx from "classnames";

const ExecutorItem = (props)=>{
    const router = useNavigate()
    const [image,setImage]=useState()
    const[fetchImage, isImageLoading, ImageError]=useFetching(async(id)=>{
        const response = await ExecutorService.getImage(id);
        setImage(response.data)
    })
   
    useEffect(()=>{
        fetchImage(props.executor.id)
    },[props.executor.id])

    return (
        <div className="executor from-mantle to-crust outline-pink" onClick={() => router(`/executors/${props.executor.id}`)}>
            <div className="executor__content">
                <div>
                    <table>
                        <tr>
                            <td><img className={cx('size:h-21 w-21 text-2xl',
                                'rounded-full',
                                'bg-cover',
                                'bg-center',
                                'bg-no-repeat',
                                'border:visible',
                                'background:mantle',
                                'border-2 border-lavender'
                            )}  src={'data:image/jpeg;base64,  '+image } width="200" height="200"/></td>
                            <td>
                                <tr><h1 className ="from-pink to-mauve ">{props.executor.nameOfExecutor}</h1></tr>
                                <tr><br></br></tr>
                                <tr><br></br></tr>
                                <tr><h2 className ="from-pink to-mauve ">{props.executor.descriptionExt}</h2></tr>
                            </td>
                        </tr>

                    </table>

                </div>
            </div>
        </div>
    );
};

export default ExecutorItem;
