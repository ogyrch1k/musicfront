import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import LoginService from "../API/LoginService";
import {useFetching} from "../hooks/useFetching";
import RegistraionRequest from "../data/RegistraionRequest";
import {Link, useNavigate} from "react-router-dom";
import Cookie from "js-cookie";
import sha256 from "js-sha256";
import AuthRequest from "../data/AuthRequest";
import Token from "../data/Token";

const Register = () => {
    const router = useNavigate()
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [loginValue,setloginValue] = useState('');
    const [nickValue,setnickValue] = useState('');
    const [passValue,setpassValue] = useState('');
    const [fileValue,setfileValue] = useState(null);
    const [errorValue,seterorValue] = useState('');
    const login = event => {
        event.preventDefault();
        if(loginValue==''||nickValue==''||passValue==''){
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
        const resp = await LoginService.register(myJSON,file)
        if(resp.status===200){
            log()
            return resp
        }
        // if(resp.status===400){
        //     alert("ошибка")
        // }
    })
    async function t(){
        const w= await getSold(loginValue)
        var sha256 = require('js-sha256');
        let password = sha256(sold+passValue);
        const registr = new RegistraionRequest(loginValue,password,sold,nickValue)
        const myJSON = JSON.stringify(registr);
        const test = fetchRegistr(myJSON,fileValue)
    }
    let flag;
    let token;
    const [fetchLogin, isCoLoading, coError] = useFetching(async (myJSON) => {
        const resp = await LoginService.auth(myJSON).catch(error => {
            flag=true
            seterorValue(error.response.data);
        });
        token = new Token(resp.data.token,"user")
        return resp;
    })
    async function log(){
        const w = await getSold(loginValue)
        var sha256 = require('js-sha256');
        let password = sha256(sold+passValue);
        const request = new AuthRequest(loginValue,password)
        const myJSON = JSON.stringify(request);
        const test= await fetchLogin(myJSON)
        if(flag){
            flag=false
            return null;
        }
        Cookie.set('token', token.token)
        Cookie.set('role', token.role)
        Cookie.set('login',loginValue)
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        router('/main')
    }
    return (
        <div>
            <h1>Страница для регистрации</h1>
            <h1>{errorValue}</h1>
            <form onSubmit={login}>
                <MyInput value={loginValue} onChange={event=>setloginValue(event.target.value)} type="text" placeholder="Введите логин"/>
                <MyInput value={nickValue} onChange={event=>setnickValue(event.target.value)} type="text" placeholder="Введите ник"/>
                {/* <MyInput onChange={e=>{setfileValue(e.target.files[0])}} type="file" placeholder="Введите ник"/> */}
                <MyInput value={passValue} onChange={event=>setpassValue(event.target.value)} type="password" placeholder="Введите пароль"/>
                <MyButton className="button bg-lavender hover:bg-mauve active:bg-mauve/75">Войти</MyButton>
                <Link to="/login">войти</Link>
            </form>
        </div>
    );
};

export default Register;
