import {IS_LOGIN, ACCOUNT,TOKEN} from './actionTypes'
import {getCookie} from '../common/js/common.js'

const defaultState = {
    isLogin: getCookie('isLoginYD') ? Boolean(getCookie('isLoginYD')) : false,
    account: getCookie('accountYD') ? getCookie('accountYD') : '',
    token: getCookie('tokenYD') ? getCookie('tokenYD') : '_test',
}
export default (state = defaultState,action) => { 
    switch(action.type){
        case IS_LOGIN: 
            return {...Object.assign(state,{
                isLogin: action.data
            })};
        case ACCOUNT: 
            return {...Object.assign(state,{
                account: action.data
            })};
        case TOKEN: 
            return {...Object.assign(state,{
                token: action.data
            })};
        default:
            return state
    }
}