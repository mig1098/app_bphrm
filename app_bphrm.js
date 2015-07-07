// JavaScript Document
(function(){
    app_bphrm = function(){
        var $ = false;
        var user_email = '';
        var d = document,url = d.URL,_path=location.pathname;
        var base_url = url.replace(/(.*?)\.com.*/,'$1.com/');
        return {
            setLib:function(jq){
                $=jq;
            },
            test:function(){
                console.log(url);
                console.log(_path);
            },
            env1:function(){
			
                $.ajax({
                url: '/ajax_receiver.asp?system=isloggedin',
                type: 'POST',
                format: 'json',
                data: null,
                success: function (data) {
                data = $.parseJSON(JSON.stringify(data));
                if (!data.IsLoggedIn) {
                }
                if (data.IsLoggedIn){
					
                var leer = app_bphrm.readCookie('Emailapolo');
				
                if(leer === 'empty'){
                	
					console.log('nada');
                var pathname = window.location.href; 
							
                 if(pathname.indexOf('/myaccount.asp') > 0){ 
                     var logeo = 'congratulation';
					
                     app_bphrm.saveEmail(logeo);
                }
                }
				
				 
                $("#show-data-apolomultimedia").show();
                var bien = 'success';
                app_bphrm.DataApolo(bien);
                }
                }
                })
                var pathname = window.location.href; 
                 if(pathname.indexOf('/affiliate_signup.asp') > 0){ 
                 $(".colors_lines_light").remove();
                $( "input[name$='btnConfirm']" ).last().remove();
                 }
                $( "#botonSubidor" ).click(function() {
                var inputFileImage = document.getElementById("archivoImage");
                var file = inputFileImage.files[0];
                var data = new FormData();
                data.append('archivo',file);
                var url = 'https://apolomultimedia.us/biopharma/ajax/upload.php';
                var shop = $("#shop-apolo").val();
                var number = $("#number-apolo").val();
                var CustomidApolo = $("#CustomidApolo").val();
                var FirstNameApolo = $("#FirstNameApolo").val();
                var LastNameApolo = $("#LastNameApolo").val();
                var EmailAddressApolo = $("#EmailAddressApolo").val();
                var mifile = 'Contexto';
                if(shop == ''){
                $("#shop-apolo").focus();
                return false;
                }
                if(number == ''){
                $("#number-apolo").focus();
                return false;
                }
                if($("#checkbox").is(':checked')) { 
                		$.ajax({
                		url:url,
                		type:'POST',
                		contentType:false,
                		data:data,
                		processData:false,
                		cache:false,
                		beforeSend: function () {
                			$("#load").html("Processing, please wait...");
                		},
                		success: function (datos) {
                			var datafile = $.parseJSON(datos);
                			if(datafile.ok === 'successful'){
                			$("#load").html("Thank you");
                			$("#archivoImage").val('');
                		var superfile = datafile.msg;
                			$.ajax({
                                data : { shop: shop, number: number, CustomidApolo: CustomidApolo, FirstNameApolo: FirstNameApolo, LastNameApolo: LastNameApolo, EmailAddressApolo: EmailAddressApolo, file: superfile },
                                url:   'https://apolomultimedia.us/biopharma/ajax/data.php',
                                type : 'POST',
                                beforeSend: function () {
                                },
                                success:  function (response) {
                               $("#continues").trigger("click");
                                }
                        });	
                			}else{
                                  $("#archivoImage").focus();
                                 $("#load").html('');
                }
                		}
                		});
                }else{  
                       alert("You have not accepted the terms and condisiones");  
                    }
                });
			
            },
			saveEmail:function(logeo){
				if(logeo === 'congratulation'){
				$.ajax({
					url: '/AccountSettings.asp?modwhat=change_a',
					type: 'GET',
					dataType:'html',
					context: document.body,
					success: function (data) {
						data = data.replace(/(\r||\r|\s+)/gm,"");
						user_email = data.replace(/.*inputname="Email"value="(.*?)"style.*/,'$1');
						app_bphrm.createCpokie('Emailapolo',user_email,'365');
						
						
					}
				});
				}
			},
        	DataApolo:function(bien){
                user_email = app_bphrm.readCookie('Emailapolo');
				
                $.ajax({
                                  type: 'GET',
                                  url: 'https://apolomultimedia.us/biopharmasci/volusion/customers-email/'+user_email,
                                  async:true,
                                  jsonpCallback: 'jsonp_callback3',
                                  contentType: "application/json",
                                  dataType: 'jsonp',
                                  success: function(r) {
									  console.log(r);
                                    var CustomidApolo = r.Customers.CustomerID;
                                    var WebApolo = r.Customers.WebsiteAddress;
                                    var FirstNameApolo = r.Customers.FirstName;
                                    var LastNameApolo = r.Customers.LastName;
                                    var EmailAddressApolo = r.Customers.EmailAddress;
                                    var CompanyName =  r.Customers.CompanyName;
                                    var BillingAddress1 = r.Customers.BillingAddress1;
                                    var BillingAddress2 = r.Customers.BillingAddress2;
                                    var City = r.Customers.City;
                                    var State = r.Customers.State;
                                    var PostalCode = r.Customers.PostalCode;
                                    app_bphrm.CustomerApolomultimedia(CustomidApolo,WebApolo,FirstNameApolo,LastNameApolo,EmailAddressApolo,CompanyName,BillingAddress1,BillingAddress2,City,State,PostalCode);
                                  },
                                  error: function(e) {
                                    alert(e.message);
                                  }
                });
            },
            CustomerApolomultimedia:function(CustomidApolo,WebApolo,FirstNameApolo,LastNameApolo,EmailAddressApolo,CompanyName,BillingAddress1,BillingAddress2,City,State,PostalCode){
                $("#CustomidApolo").val(CustomidApolo);
                $("#shop-apolo").val(WebApolo);
                $("#FirstNameApolo").val(FirstNameApolo);
                $("#LastNameApolo").val(LastNameApolo);
                $("#EmailAddressApolo").val(EmailAddressApolo);
                $("#data-cliente").html(""+FirstNameApolo+" "+LastNameApolo+" <br> "+CompanyName+" <br> "+BillingAddress1+" <br> "+BillingAddress2+" <br> "+City+", "+State+" "+PostalCode+"");
            },
            createCpokie:function (key, value,exdays) { 
                 var expires = new Date(); 
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
                var expires = new Date(); 
                expires.setTime(expires.getTime()+ (-1*24*60*60*1000)); 
                cookie = cname + "=;expires="+expires.toUTCString()+";path=/"; 
                return document.cookie = cookie; 
            },
            init:function(action){
                switch(action){
                    case 'test':
                        app_bphrm.test();
                    break;
                    case 'env1':
						app_bphrm.env1();
                    break;
                }
            }
        }
    };
    window.app_bphrm = new app_bphrm;
})();
