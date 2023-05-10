import {useMemo} from "react";

export const useTracks =(tracks, sort, query)=>{
    const sortedTracks = useSortedTracks(tracks, sort);

    const sortedAndSearchedTracks  = useMemo(() => {
        return sortedTracks.filter(track => track.nameOfTrack.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedTracks])

    return sortedAndSearchedTracks;
}

export const useSortedTracks = (tracks, sort) => {
    const sortedTracks = useMemo(() => {
        if(sort) {
            return [...tracks].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return tracks;
    }, [sort, tracks])

    return sortedTracks;
}