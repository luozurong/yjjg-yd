export const setCookie = function(name, value, Days){
    if(Days <= 0) Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";path=/";
}

export const getCookie = function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if(arr)
        return decodeURI(arr[2]);
    return null;
}

export const isEmpty = function(name){
    if(name === '' || name === null || name === undefined){
        return true
    }
    return false
}

export const getTimeDate = function(date){
    const yy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return yy + '-' + mm + '-' + dd
}