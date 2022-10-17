
import { privateAxios } from './AxiosHelper.js';


export const createFeedBack=(feedback)=>{
    return privateAxios.post(`/feedback`,feedback).then((response)=>{return response.data})
}