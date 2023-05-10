import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import LoginService from "../API/LoginService";
import AuthRequest from "../data/AuthRequest";
import {useFetching} from "../hooks/useFetching";
import Token from "../data/Token";
import Cookie from 'js-cookie'
import {Link, useNavigate} from "react-router-dom";
import UserService from "../API/UserService";
const Login = () => {
    const router = useNavigate()
    const [id, setId] = useState(0);
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [loginValue,setloginValue] = useState('');
    const [passValue,setpassValue] = useState('');
    const [errorValue,seterorValue] = useState();
    const login = event => {
        event.preventDefault();
        if(loginValue==''||passValue==''){
            alert("заполните все поля")
        }
        t()

    }
    let flag;
    let sold;
    const [getSold, isSoldLoading, soldError] = useFetching(async (loginValue) => {
        const response = await LoginService.getSold(loginValue);
        sold =response.data
    })
    let token;
    const [fetchLogin, isComLoading, comError] = useFetching(async (myJSON) => {
        const resp = await LoginService.auth(myJSON).catch(error => {
            flag=true
            seterorValue(error.response.data);
        });
        token = new Token(resp.data.token,"user")
        return resp;
    })
    const [fetchUser,isLoading, error] = useFetching(async (login)=>{
        const response = await UserService.getUser(login);
        setId(response.data);
        return response

    })
    async function t(){
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
       const r= await fetchUser(loginValue)
        console.log(r)
        console.log(id)
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        router('/playlists')
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <h1>{errorValue}</h1>
            <form onSubmit={login}>
                <MyInput value={loginValue} onChange={event=>setloginValue(event.target.value)} type="text" placeholder="Введите логин"/>
                <MyInput value={passValue} onChange={event=>setpassValue(event.target.value)} type="password" placeholder="Введите пароль"/>
                <MyButton className="button bg-lavender hover:bg-mauve active:bg-mauve/75">Войти</MyButton>
                <Link to="/registration">Регистрация</Link>
            </form>
        </div>
    );
};

export default Login;
