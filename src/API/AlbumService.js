import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";
export default class AlbumService{
    static token;
    static async getAlbumsOfExecutor(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/albumExecutor?idExecutor='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getImage(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/imageAlbum?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getAlbum(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/album?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async createAlbum(albumData,file){
        this.token=Cookies.get('token')
        var bodyFormData = new FormData();
        bodyFormData.append('json', albumData);
        bodyFormData.append('file', file);
        const response = await axios.post(url+'/album',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async editAlbum(albumData,file){
        this.token=Cookies.get('token')
        var bodyFormData = new FormData();
        bodyFormData.append('json', albumData);
        bodyFormData.append('file', file);
        const response = await axios.patch(url+'/album',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async delAlbum(id){
        this.token=Cookies.get('token')
        const response = await  axios.delete(url+'/album?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async getAll(){
        this.token=Cookies.get('token')
        const response = await axios.get(url+'/allAlbum',{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async addAlbumExecutor(idOfAlbum,idOfExecutor){
        this.token=Cookies.get('token')
        const response = await axios.post(url+'/albumExecutor?idOfAlbum='+idOfAlbum+'&idOfExecutor='+idOfExecutor,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async removeAlbumExecutor(idOfAlbum,idOfExecutor){
        this.token=Cookies.get('token')
        const response = await axios.delete(url+'/albumExecutor?idOfAlbum='+idOfAlbum+'&idOfExecutor='+idOfExecutor,{},{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async addAlbumUser(idOfAlbum,idOfUser){
        this.token=Cookies.get('token')
        const response = await axios.post(url+'/collectionAlbum?idOfAlbum='+idOfAlbum+'&idOfUser='+idOfUser,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async removeAlbumUser(idOfAlbum,idOfUser){
        this.token=Cookies.get('token')
        const response = await axios.delete(url+'/collectionAlbum?idOfAlbum='+idOfAlbum+'&idOfUser='+idOfUser,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
}
