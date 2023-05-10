import {useMemo} from "react";

export const usePlaylists=(playlists,sort,query)=>{
    const sortedPlaylists = useSortedPlaylists(playlists, sort);

    const sortedAndSearchedPlaylists  = useMemo(() => {
        return sortedPlaylists.filter(playlist => playlist.nameOfPlaylist.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPlaylists])

    return sortedAndSearchedPlaylists;
}

export const useSortedPlaylists= (playlists, sort) => {
    const sortedPlaylists= useMemo(() => {
        if(sort) {
            return [...playlists].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return playlists;
    }, [sort, playlists])
    return sortedPlaylists
}
