import React, {useContext, useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import ExecutorService from "../API/ExecutorService";

const ExecutorDeleteForm=(props)=>{
    const [value,setValue]=useState()

    const [delet,isload,err]=useFetching(async (id)=>{
       const request =await ExecutorService.delExecutor(id)
        if(request.status===200){
            window.location.reload(false);
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
                defaultValue={"Выберите Исполнителя"}
                onChange={value=>setValue(value)}
                options={props.executor
                }/>
            <MyButton onClick={del}> удалить</MyButton>
        </form>
    )
}
export default ExecutorDeleteForm
