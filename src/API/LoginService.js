import axios from "axios";
import {url} from "./Url";
export default class LoginService{
    static async getSold(login){
        const response = await axios.get(url+'/getsold', {
            params: {
                login: login
            }
        })
        return response;
    }
    static async auth(authRequest) {
        var bodyFormData = new FormData();
        bodyFormData.append('auth', authRequest);
        const response = await axios.post(url+'/auth',bodyFormData)
        return response;
    }
    static async register(registerRequest,file){
        var bodyFormData = new FormData();
        bodyFormData.append('json', registerRequest);
        bodyFormData.append('file', file);
        const response = await axios.post(url+'/register',bodyFormData)
        return response;
    }
    static async registerAdmin(registerRequest,file){
        var bodyFormData = new FormData();
        bodyFormData.append('json', registerRequest);
        bodyFormData.append('file', file);
        const response = await axios.post(url+'/registerAdmin',bodyFormData)
        return response;
    }
}
