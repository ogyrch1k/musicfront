import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";
export default class NewsService{
    static token;
    static async getNews(id){
        this.token=Cookies.get('token');
        const response =await axios.get(url+'/news?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async createNews(newsData,file){
        this.token=Cookies.get('token');
        var bodyFormData = new FormData();
        bodyFormData.append('json', newsData);
        bodyFormData.append('file', file);
        const response =await axios.post(url+'/news',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async editNews(newsData,file){
        this.token=Cookies.get('token');
        var bodyFormData = new FormData();
        bodyFormData.append('json', newsData);
        bodyFormData.append('file', file);
        const response =await axios.path(url+'/news',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async delNews(id){
        this.token=Cookies.get('token');
        const response =await axios.delete(url+'/news?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async getImage(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/imageNews?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async getAll(pageNumber,pageSize, token){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/allNewsPage?pageNumber='+pageNumber+'&pageSize='+pageSize, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

}
