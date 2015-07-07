window.onload = function() {
    app_bphrm = (function($){
        var d = document,url = d.URL,_path=location.pathname;
        var base_url = url.replace(/(.*?)\.com.*/,'$1.com/');
        return {
            test:function(){
                console.log(url);
                console.log(_path);
            },
            createCpokie:function (key, value,exdays) { 
                 expires = new Date(); 
                 expires.setTime(expires.getTime()+ (exdays*24*60*60*1000)); 
                 cookie = key + "=" + value + ";expires=" + expires.toUTCString()+";path=/"; 
                 return document.cookie = cookie; 
            },
            readCookie:function (key) { 
                keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)"); 
                 if (keyValue){ 
                    return keyValue[2]; 
                 } else { 
                    return "empty"; 
                 } 
            },
            setCookie:function (cname,cvalue,exdays) { 
                var d = new Date(); 
                d.setTime(d.getTime() + (exdays*24*60*60*1000)); 
                var expires = "expires=" + d.toGMTString(); 
                document.cookie = cname+"="+cvalue+"; "+expires+";path=/"; 
            }, 
            deleteCookie:function(cname) { 
                expires = new Date(); 
                expires.setTime(expires.getTime()+ (-1*24*60*60*1000)); 
                cookie = cname + "=;expires="+expires.toUTCString()+";path=/"; 
                return document.cookie = cookie; 
            },
            init:function(action){
                switch(action){
                    case 'test':
                        app_bphrm.test();
                    break;
                }
            }
        }
    })($jQueryModern);
    app_bphrm.init('test');
}; 