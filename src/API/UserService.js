import axios from "axios";
import Cookies from 'js-cookie';
import {url} from "./Url";
export default class UserService{
    static token;
    static async getUser(login){
        this.token = Cookies.get('token');
        const response = await axios.get(url+'/users?login='+login,{ headers: {'authorization' : `Bearer `+this.token}})
        return response;
    }
}
