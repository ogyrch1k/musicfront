import {useMemo} from "react";

export const useAlbums =(albums, sort, query)=>{
    const sortedAlbums = useSortedAlbums(albums, sort);

    const sortedAndSearchedAlbums  = useMemo(() => {
        return sortedAlbums.filter(album => album.nameOfTrack.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedAlbums])

    return sortedAndSearchedAlbums;
}

export const useSortedAlbums = (albums, sort) => {
    const sortedAlbums = useMemo(() => {
        if(sort) {
            return [...albums].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return albums;
    }, [sort, albums])

    return sortedAlbums;
}