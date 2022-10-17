

import {myAxios} from '../Service/AxiosHelper.js';

export const signUp=(user)=>{
    return myAxios.post(`/auth/register`,user).then((response)=>response.data);
};
export const login=(loginUser)=>{
    return myAxios.post(`/auth/login`,loginUser).then((response)=>response.data);
};