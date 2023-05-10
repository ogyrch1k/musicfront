import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";


export default class PlaylistService{
    static token;
    static login
    static async getAll(){
        this.token = Cookies.get('token');
        this.login = Cookies.get('login')
        const response = await axios.get(url+'/allPlaylist?login='+ this.login, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getPlaylist(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/playlist?id='+ id, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async createPaylist(playlistData){
        var bodyFormData = new FormData();
        bodyFormData.append('json',playlistData)
        this.token=Cookies.get('token');
        const response = await axios.post(url+'/playlist',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static  async addPlaylistToUser(idPlaylist,loginUser){
        this.token=Cookies.get('token');
        const response = await axios.post(url+'/collectionPlaylist?idOfPlaylist='+idPlaylist+'&loginUser='+loginUser,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async addTrackToPlaylist(idPlaylist,IdTrack){
        this.token=Cookies.get('token');
        const response = await axios.post(url+'/trackPLaylist?idOfTrack='+IdTrack+'&idOfPlaylist='+idPlaylist,{}, { headers: {'authorization' : `Bearer `+this.token}})
         return response
    }

    static async delTrackToPlaylist(idPlaylist,IdTrack){
        this.token=Cookies.get('token');
        const response = await axios.post(url+'/trackPLaylist?idOfTrack='+IdTrack+'&idOfPlaylist='+idPlaylist,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async delPlaylist(idPlaylist){
        this.token =Cookies.get('token');
        const response = await axios.delete(url+'/playlist?id='+idPlaylist)
        return response
    }
    static async editPlaylist(playlistData){
        var bodyFormData = new FormData();
        this.token=Cookies.get('token');
        bodyFormData.append('json',playlistData)
        this.token=Cookies.get('token');
        const response = await axios.patch(url+'/playlist',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
        
    }
}
