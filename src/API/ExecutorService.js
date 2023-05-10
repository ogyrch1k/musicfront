import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";
export default class ExecutorService{
    static token;


    static async getExecutor(id) {
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/executor?id='+id, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    static async getAll(pageNumber,pageSize, token){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/allExecutorsPage?pageNumber='+pageNumber+'&pageSize='+pageSize, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
    // static async addExecutor(){
    //     const responce = await axios.post('http://localhost/executor',formdata)
    // }

    static async getImage(id){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/imageExecutor?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async createExecutor(executorData,file){
        this.token=Cookies.get('token')
        var bodyFormData = new FormData();
        bodyFormData.append('json', executorData);
        bodyFormData.append('file', file);
        const response = await axios.post(url+'/executor',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async editExecutor(executorData,file){
        this.token=Cookies.get('token')
        var bodyFormData = new FormData();
        bodyFormData.append('json', executorData);
        bodyFormData.append('file', file);
        const response = await axios.patch(url+'/executor',bodyFormData,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async delExecutor(id){
        this.token=Cookies.get('token')
        const response = await  axios.delete(url+'/executor?id='+id,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }
    static async getAllExecutor(){
        this.token=Cookies.get('token')
        const response = await axios.get(url+'/allExecutors',{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async searchExecutor(name){
        this.token =Cookies.get('token')
        const response = await axios.get(url+'/getExecutorByName?name='+name,{ headers: {'authorization' : `Bearer `+this.token}})
        return response
    }

    static async addExecutorToUser(idOfExecutor,idOfUser){
        this.token=Cookies.get('token')
        const response = await axios.post(url+'/collectionExecutor?idOfExecutor='+idOfExecutor+'&idOfUser='+idOfUser,{}, { headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }

    static async removeExecutorFromUser(idOfExecutor,idOfUser){
        this.token=Cookies.get('token')
        const response = await axios.delete(url+'/collectionExecutor?idOfExecutor='+idOfExecutor+'&idOfUser='+idOfUser,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
}
