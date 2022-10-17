
import {myAxios} from '../Service/AxiosHelper.js';
import { privateAxios } from './AxiosHelper.js';


export const loadAllCategories=()=>{
    return myAxios.get(`/category/`).then((response)=>{return response.data});
}
export const createCategories=(categoryData)=>{
    return privateAxios.post(`/category/`,categoryData).then((response)=>{return response.data});
}

