import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import Cookie from 'js-cookie'
import ExecutorService from "../API/ExecutorService";
import PlaylistData from "../data/PlaylistData";
import dateOfFormation from "../data/dateOfFormation";
import ExecutorData from "../data/ExecutorData";
import disbandmentDate from "../data/disbandmentDate";
import MySelect from "./UI/select/MySelect";

import {useNavigate} from "react-router-dom";

const ExecutorAddForm=()=>{
    const router = useNavigate()
    const[executor,setExecutor]= useState({nameOfExecutor:'',dateOfFormationYear:'',dateOfFormationMonth:'',dateOfFormationDay:'',disbandmentDateYear:'',disbandmentDateMonth:'',disbandmentDateDay:'',descriptionExt:''})
    const [fileValue,setfileValue] = useState(undefined);
    const[addExecutor,isloD,err]=useFetching(async(myJson,file)=>{
        const response= await ExecutorService.createExecutor(myJson,file)
        if(response.status===200){
            console.log(response.data)
            router("/executors/"+response.data)
            return response
        }
    })

    const addNewExecuor= (e) => {
        e.preventDefault()
        if(executor.nameOfExecutor==''||executor.dateOfFormationYear==''||executor.descriptionExt==''||executor.disbandmentDateYear==''){
            alert("заполните все поля")
        }else{
            const DateOfFormation= new dateOfFormation( parseFloat(executor.dateOfFormationYear), "1", "1")
            const DisbandmentDate = new disbandmentDate(parseFloat(executor.disbandmentDateYear),"1","1")
            const executorData = new ExecutorData(null,executor.nameOfExecutor,executor.descriptionExt,DateOfFormation,DisbandmentDate)
            const myJSON = JSON.stringify(executorData);
            console.log(myJSON)
            addExecutor(myJSON,fileValue)
        }
       
    }
    return(
        <form>
            <MyInput
                value={executor.nameOfExecutor}
                onChange={e => setExecutor({...executor, nameOfExecutor: e.target.value})}
                type="text"
                placeholder="Название исполнителя"
            />
            <MyInput
                value={executor.descriptionExt}
                onChange={e => setExecutor({...executor, descriptionExt: e.target.value})}
                type="text"
                placeholder="Описание исполнителя"
            />
            <MyInput
                value={executor.dateOfFormationYear}
                onChange={e => setExecutor({...executor, dateOfFormationYear: e.target.value})}
                type="number"
                placeholder="год создания"
            />
            <MyInput
                value={executor.disbandmentDateYear}
                onChange={e => setExecutor({...executor, disbandmentDateYear: e.target.value})}
                type="number"
                placeholder="год расформирования"
            />
            <MyInput onChange={e=>{setfileValue(e.target.files[0])}} type="file" placeholder="Введите ник"/>
            <MyButton onClick={addNewExecuor}>Создать исполнителя</MyButton>
        </form>
    )

}
export default ExecutorAddForm
