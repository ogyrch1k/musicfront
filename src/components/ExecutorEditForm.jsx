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

const ExecutorEditForm=(props)=>{
    const router = useNavigate()
    const[executor,setExecutor]= useState({nameOfExecutor:'',dateOfFormationYear:'',dateOfFormationMonth:'',dateOfFormationDay:'',disbandmentDateYear:'',disbandmentDateMonth:'',disbandmentDateDay:'',descriptionExt:''})
    const [fileValue,setfileValue] = useState(undefined);
    const[addExecutor,isloD,err]=useFetching(async(myJson,file)=>{
        const response= await ExecutorService.editExecutor(myJson,file)
        console.log(response.status)
        if(response.status===200){
            //router.push("/executors/"+props.executor.id)

            return response
        }
    })
    function urltoFile(url, filename, mimeType){
        return (fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }

    //Usage example:
    //urltoFile(props.image, 'image.jpg','image/jpeg').then(function(file){ setfileValue(file)});
    let executorData = new ExecutorData(props.executor.id,props.executor.nameOfExecutor,props.executor.descriptionExt,props.executor.dateOfFormation,props.executor.disbandmentDate)

    const editExecuor= (e) => {
        e.preventDefault()
        const  DateOfFormation= new dateOfFormation( parseFloat(executor.dateOfFormationYear), "1", "1")
        const DisbandmentDate = new disbandmentDate(parseFloat(executor.disbandmentDateYear),"1","1")
        executorData = new ExecutorData(props.executor.id,executor.nameOfExecutor,executor.descriptionExt,DateOfFormation,DisbandmentDate)
        const myJSON = JSON.stringify(executorData);
        addExecutor(myJSON,fileValue)
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
            <MyButton onClick={editExecuor}>Изменить исполнителя</MyButton>
        </form>
    )
}
export default ExecutorEditForm