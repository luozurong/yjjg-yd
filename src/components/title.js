const setTitle = (title) => {//动态设置微信公众号title    
    document.title = title;    
    let userAgent = window.navigator.userAgent.toLowerCase();    
    let isiOS = userAgent.indexOf('applewebkit') >= 0;    
    let isWechat = userAgent.indexOf('micromessenger') >= 0;    
    if (isiOS && isWechat) {      
        let iframe = document.createElement('iframe');      
        iframe.src = 'https://www.baidu.com/favicon.ico';      
        iframe.style.display = 'none';      
        document.body.appendChild(iframe);      
        iframe.onload = function() {        
            setTimeout(function() {          
                iframe.remove();        
            }, 0);      
        };    
    }
};
export default setTitle;


