import {IS_LOGIN,ACCOUNT,TOKEN} from './actionTypes'

//是否登录
export const inLogin = (data)=>({
    type: IS_LOGIN,
    data: data
});

//账户
export const setAccount = (data)=>({
    type: ACCOUNT,
    data: data
});

//token
export const setToken = (data)=>({
    type: TOKEN,
    data: data
});