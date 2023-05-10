import genreData from "../data/GenreData"
import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";

export default class GenreServise{
    static token;

    static async getAllGenres(){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/allGenres',{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async getGenre(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/genre?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async deleteGenre(id){
        this.token = Cookies.get('token');
        const response = await axios.delete(url+'/genre?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async addGenre(genreName){
        this.token = Cookies.get('token');
        const response = await axios.post(url+'/genre?nameOfGenre='+genreName,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
}