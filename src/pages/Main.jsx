import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PlaylistForm from "../components/PlaylistForm";
import PlaylistList from "../components/PlaylistList";
import Loader from "../components/UI/Loader/Loader";
import Player from "../components/UI/Player/Player";
import PlayListsUser from "../components/PlayListsUser";

function Main(){
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    return(
        <div className="App">
            <div className="mainTitels">
                <h1  className ="from-pink to-mauve ">
                    Плейлисты
                </h1>
                <h1  className ="from-pink to-mauve">
                    Треки
                </h1>
                <h1 className ="from-pink to-mauve">
                    Альбомы
                </h1>
                <h1 className ="from-pink to-mauve">
                    Исполнители
                </h1>
            </div>
            <PlayListsUser> </PlayListsUser>
        </div>
    )
}

export default Main