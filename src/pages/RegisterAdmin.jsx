import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import LoginService from "../API/LoginService";
import {useFetching} from "../hooks/useFetching";
import RegistraionRequest from "../data/RegistraionRequest";
import {Link} from "react-router-dom";

const RegisterAdmin = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [loginValue,setloginValue] = useState('');
    const [nickValue,setnickValue] = useState('');
    const [passValue,setpassValue] = useState('');
    const [fileValue,setfileValue] = useState(undefined);
    const [errorValue,seterorValue] = useState('');
    const login = event => {
        event.preventDefault();
        if(loginValue==''||nickValue==''||passValue==''||fileValue==undefined){
            alert("заполните все поля")
        }
        t()

    }
    let sold;
    const [getSold, isSoldLoading, soldError] = useFetching(async (loginValue) => {
        const response = await LoginService.getSold(loginValue)
        sold =response.data
    })
    const [fetchRegistr, isComLoading, comError] = useFetching(async (myJSON,file) => {
        const resp = await LoginService.registerAdmin(myJSON,file)
        return resp;
    })
    async function t(){
        const w= await getSold(loginValue)
        var sha256 = require('js-sha256');
        let password = sha256(sold+passValue);
        const registr = new RegistraionRequest(loginValue,password,sold,nickValue)
        const myJSON = JSON.stringify(registr);
        const test = fetchRegistr(myJSON,fileValue)
    }
    return (
        <div>
            <h1>Страница для регистрации администратора</h1>
            <h1>{errorValue}</h1>
            <form onSubmit={login}>
                <MyInput value={loginValue} onChange={event=>setloginValue(event.target.value)} type="text" placeholder="Введите логин"/>
                <MyInput value={nickValue} onChange={event=>setnickValue(event.target.value)} type="text" placeholder="Введите ник"/>
                <MyInput onChange={e=>{setfileValue(e.target.files[0])}} type="file" placeholder="Введите ник"/>
                <MyInput value={passValue} onChange={event=>setpassValue(event.target.value)} type="password" placeholder="Введите пароль"/>
                <MyButton className="button bg-lavender hover:bg-mauve active:bg-mauve/75">Войти</MyButton>
                <Link to="/loginAdmin">войти</Link>
            </form>
        </div>
    );
};

export default RegisterAdmin;
