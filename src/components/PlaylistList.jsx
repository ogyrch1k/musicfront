import React, { useEffect,useState } from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useFetching} from "../hooks/useFetching";
import PlaylistItem from "./PlaylistItem";
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/MyModal/MyModal";
import PlaylistForm from "./PlaylistForm";

const PlaylistList=({playlists, title})=>{

    const [modal, setModal] = useState(false);
    if (!playlists.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Плейлисты не найдены!
            </h1>
        )
    }

    return (
        <div className="playlistlist">

            <MyModal visible={modal} setVisible={setModal}>
                <PlaylistForm />
            </MyModal>
            <MyButton style={{marginTop: 30}} className="button bg-lavender hover:bg-mauve active:bg-mauve/75" onClick={() => setModal(true)}>
                Создать плейлист
            </MyButton>
            <TransitionGroup>
                {playlists.map((playlist, index) =>
                    <CSSTransition
                        key={playlist.id}
                        timeout={500}
                        classNames="playlist"
                    >
                        <PlaylistItem  number={index + 1} playlist={playlist} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PlaylistList
