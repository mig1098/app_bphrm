app_bphrm = (function(){
    
    var d = document,url = d.URL,_path=location.pathname;
    var base_url = url.replace(/(.*?)\.com.*/,'$1.com/');
    return {
        test:function(){
            console.log('testing app');
        },
        init:function(action){
            switch(action){
                case 'test':
                    app_bphrm.test();
                break;
            }
        }
    }
})()

app_bphrm.init('test');