import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";
export default class TrackService{
    static token;
    static async getTracksOfAlbum(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/trackAlbum?idAlbum='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getTracksOfPLaylist(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/trackPlaylist?idPlaylist='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getTrackById(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/track?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async getTracksById(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/tracks?'+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getSong(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/getSong?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async addTrack(json,file){
        this.token = Cookies.get('token');
        var bodyFormData = new FormData();
        bodyFormData.append('json', json);
        bodyFormData.append('file', file);
        const response = await axios.post(url+'/track',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async allTracks(){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/getAllTrack',{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async delTrack(id){
        this.token = Cookies.get('token');
        const response = await axios.delete(url+'/track?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async addTrackToAlbum(idOfTrack,idOfAlbum){
        this.token = Cookies.get('token');
        const response = await axios.post(url+'/trackAlbum?idOfTrack='+idOfTrack+'&idOfAlbum='+idOfAlbum,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async removeTrackFromAlbum(idOfTrack,idOfAlbum){
        this.token = Cookies.get('token');
        const response = await axios.delete(url+'/trackAlbum?idOfTrack='+idOfTrack+'&idOfAlbum='+idOfAlbum,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async addTrackToUser(idOfTrack,idOfUser){
        this.token = Cookies.get('token');
        const response = await axios.post(url+'/collectionTrack?idOfTrack='+idOfTrack+'&idOfUser='+idOfUser,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async removeTrackFromUser(idOfTrack,idOfUser){
        this.token = Cookies.get('token');
        const response = await axios.delete(url+'/collectionTrack?idOfTrack='+idOfTrack+'&idOfUser='+idOfUser,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
}
