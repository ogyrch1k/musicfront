import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import Player from "./components/UI/Player/Player";
import Cookie from "js-cookie";


function App() {
    const [reload, setReload]=useState(0);
    const [isAuth, setIsAuth] = useState(false);
    // const [path, setPath] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [arr, setArr] = useState([]);
    const [name, setName] = useState([]);
    const [song, setSong] = useState();
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
        setArr(Cookie.get('arr'))
        setReload(0);
        // eslint-disable-next-line react-hooks/rules-of-hooks
       // setPath(useLocation().pathname)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            id,
            arr,
            song,
            setId,
            setArr,
            setSong,
            reload,
            name,
            setName
            // path,
            // setPath
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
                <Player/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;

