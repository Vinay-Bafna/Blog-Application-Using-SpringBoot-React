

//isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data !== null){
        return true} 
    else {return false};
  
};


//doLogin =>data=> set to localstorage
export const doLogin = (data,next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next();
}

//doLogout remove from localStorage
export const doLogout = () => {
        localStorage.clear();
}

//getCurrent User
export const getCurrentUserDetails = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return false;
    }
}


export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('data')).token;
    }else{
        return false;
    }
}


