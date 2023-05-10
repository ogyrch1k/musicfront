import React, {useContext,useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import Cookie from 'js-cookie'
import UserItem from '../../UserItem';
import { useFetching } from '../../../hooks/useFetching';
import UserService from '../../../API/UserService';
import MyInput from "../input/MyInput";
import ExecutorService from "../../../API/ExecutorService";
import MyA from "../A/MyA";
const Navbar = () => {
    const types = ["Коллекция", "Исполнители", "Страница админа"];
    const [active, setActive] = useState(types[0]);
    const router = useNavigate()
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {id, setId} = useContext(AuthContext);
    // const {path, setPath} = useContext(AuthContext);
    const [user,setUser]=useState()
    const [searchValue, setSearchValue]= useState()
    const [executor,setExecutor] = useState()
    const role=Cookie.get('role')
    const [fetchUser,isLoading, error] = useFetching(async (login)=>{
        const response = await UserService.getUser(login);
        setUser(response.data.nick);

    })
    const [searchExecutor,isLoad, erro]=useFetching(async (name)=>{
        const response =await ExecutorService.searchExecutor(name);
        if(response.data.id!=null)
            router('/executors/'+response.data.id)
        else
            alert("Исполнитель не найден")
        setExecutor(response.data.id)
    })
    useEffect(() => {
        console.log("navbar")
        let login =Cookie.get("login")
        fetchUser(login)
    }, [isAuth])

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
        Cookie.remove("token")
        Cookie.remove("role")
        Cookie.remove("login")
        setId(0);
        router("/login")
    }
     function search(){
        searchExecutor(searchValue)
        console.log(executor)

    }


    function toMain(){
        router('/main')
    }
    function toMain(){
        router('/main')
    }
    function toPlaylists(){
        router('/playlists')
    }
    function toExecutors(){
        router('/executors')
    }
    function toAdmin(){
        router('/admin')
    }
    if(!isAuth) return null;

    return (
        <div className="navbar from-mantle to-crust outline-pink">
            <div className=" fornavbut mb-6 px-2 py-2 rounded-xl text-text">
            {/*<MyButton onClick={ toMain}>*/}
            {/*    APP*/}
            {/*</MyButton>*/}
            {/*<MyButton onClick={ toMain}>*/}
            {/*    Главная*/}
            {/*</MyButton>*/}

            <MyButton onClick={ toPlaylists} className="navbutton-left bg-overlay0/50 hover:bg-pink/50 active:bg-pink/50">
                Коллекция
            </MyButton>
                {
                    role==='user'&&
                    <MyButton onClick={ toExecutors} className="navbutton-right bg-overlay0/50 hover:bg-pink/50 active:bg-pink/50">
                        Исполнители
                    </MyButton>
                }
                {role==='admin' &&
            <MyButton onClick={ toExecutors} className="navbutton-center bg-overlay0/50 hover:bg-pink/50 active:bg-pink/50">
                Исполнители
            </MyButton>}
                {role==='admin' &&
            <MyButton onClick={ toAdmin} className="navbutton-right bg-overlay0/50 hover:bg-pink/50 active:bg-pink/50">
                Страница админа
            </MyButton>

            }
            </div>
            <div className="search">
                {
                    isAuth &&
                    <div>
                        <MyInput value={searchValue} onChange={event=>setSearchValue(event.target.value)} type="text" placeholder="поиск исполнителя"/>
                    </div>
                }
            </div>
            {
                isAuth &&
                <MyButton onClick={search}>поиск</MyButton>
            }
            <div className="navbar__links">
                <MyButton onClick={logout}  className="button bg-lavender hover:bg-mauve active:bg-mauve/75">
                    Выйти
                </MyButton>
            </div>
        </div>

    );
};



// const [fetchUser,isLoading, error] = useFetching(async (login)=>{
//     const response = await UserService.getUser(login);
//     setUser(response.data.nick);
//
// })
// const [searchExecutor,isLoad, erro]=useFetching(async (name)=>{
//     const response =await ExecutorService.searchExecutor(name);
//     if(response.data.id!=null)
//         router('/executors/'+response.data.id)
//     else
//         alert("Исполнитель не найден")
//     setExecutor(response.data.id)
// })
// class Navbar extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             user,
//             searchValue,
//             executor,
//
//         }
//     }
//     static id =AuthContext
//     static isAuth =AuthContext
//         router = useNavigate()
//          role=Cookie.get('role')
//          logout = () => {
//             setIsAuth(false);
//             localStorage.removeItem('auth')
//             Cookie.remove("token")
//             Cookie.remove("role")
//             Cookie.remove("login")
//             setId(0);
//         }
//         useEffect(() => {
//             console.log("navbar")
//             let login =Cookie.get("login")
//             fetchUser(login)
//         }, [isAuth])
//
//
//
//
//
//       search(){
//         searchExecutor(searchValue)
//         console.log(executor)
//
//     }
//
//      toMain(){
//         router('/main')
//     }
//      toMain(){
//         router('/main')
//     }
//      toPlaylists(){
//         router('/playlists')
//     }
//      toExecutors(){
//         router('/executors')
//     }
//      toAdmin(){
//         router('/admin')
//     }
//
//     render(){
//     if(!isAuth) return null;
//             return (
//         <div className="navbar">
//
//             {/*<MyButton onClick={ toMain}>*/}
//             {/*    APP*/}
//             {/*</MyButton>*/}
//             {/*<MyButton onClick={ toMain}>*/}
//             {/*    Главная*/}
//             {/*</MyButton>*/}
//             <MyButton onClick={ toPlaylists}>
//                 Колллекция
//             </MyButton>
//             <MyButton onClick={ toExecutors}>
//                 Исполнители
//             </MyButton>
//             {
//             role==='admin' &&
//             <MyButton onClick={ toAdmin}>
//                 Страница админа
//             </MyButton>}
//             <div className="search">
//                 {
//                     isAuth &&
//                     <div>
//                         <MyInput value={searchValue} onChange={event=>setSearchValue(event.target.value)} type="text" placeholder="поиск исполнителя"/>
//                     </div>
//                 }
//             </div>
//             {
//                 isAuth &&
//                 <MyButton onClick={search}>поиск</MyButton>
//             }
//             <div className="navbar__links">
//                 <MyButton onClick={logout}>
//                     Выйти
//                 </MyButton>
//             </div>
//         </div>
//     );
//     }
// }

export default Navbar;
