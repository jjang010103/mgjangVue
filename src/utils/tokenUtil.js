
const tokenKey ='tkn';

export const getToken = () => {
    let token = localStorage.getItem(tokenKey);
    if(token == null) token = sessionStorage.getItem(tokenKey);

    return token;
}

export const setToken = (token, isAutoLogin) => {
    if(isAutoLogin) localStorage.setItem(tokenKey, token);
    else sessionStorage.setItem(tokenKey, token);
}