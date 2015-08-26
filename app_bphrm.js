(function(window, undefined){
    app_bphrm = function(){
        var $ = false;
        var user_email = '';
        var d = document,url = d.URL,_path=location.pathname;
        var base_url = url.replace(/(.*?)\.com.*/,'$1.com/');
        /**/
        var conditions = ['bi-monthly','quarterly','recurring'];
        var URI = {prdata:'//leaninbetween.com/biopharmasci/volusion/product-data',chk:'//leaninbetween.com/biopharmasci/cart',lgg:'/ajax_receiver.asp?system=isloggedin'};
        var BTNADDTOCART = 'input[name="btnaddtocart"]';
        var BTNCHECKOUT = 'input[name="btn_checkout_guest"]';
        var PRODUCT_CODE = '';
        var CARTNAME = '_cartapi';
        var SUFIX = '-ap';
        var CARTAPI_ID = 'cartapi-btn';
        var CURRENCY = '$';
        return{
            setLib:function(jq){
                $=jq;
            },
            test:function(){
                console.log(url);
                console.log(_path);
            },
            env1:function(){
                $.ajax({
                    url: URI.lgg,
                    type: 'POST',
                    format: 'json',
                    data: null,
                    success: function (data){
                        data = $.parseJSON(JSON.stringify(data));
						var pat = window.location.href;
						if(pat.indexOf('login.asp') > 0){
							app_bphrm.createCpokie('session','n','365');
							app_bphrm.createCpokie('affiliates','true','365');
							app_bphrm.deleteCookie('condicionar');
						}
						if(pat.indexOf('myaccount.asp') > 0){
							app_bphrm.createCpokie('session','y','365');
							setTimeout(function(){
							var affiliates = app_bphrm.readCookie('affiliates');
							var condisionando = app_bphrm.readCookie('condicionar');
							if(affiliates === 'true' && condisionando === 'true'){
								app_bphrm.deleteCookie('affiliates');
								app_bphrm.deleteCookie('condicionar');
								window.location.href = 'https://www.biopharmasci.com/affiliate_signup.asp';
							}
							}, 2000);
						}
						if(pat.indexOf('AccountSettings.asp?NewSignup=Y&modwhat=change_s&ReturnTo=') > 0){
							app_bphrm.createCpokie('session','y','365');
						}
						if(pat.indexOf('affiliate_signup.asp') > 0){
							app_bphrm.createCpokie('condicionar','true','365');
							app_bphrm.createCpokie('session','y','365');
							var redi = app_bphrm.readCookie('redirection');
							if(redi !== 'empty'){
								app_bphrm.deleteCookie('redirection');
							}
						}
						setTimeout(function(){
							if(pat.indexOf('AccountSettings.asp?NewSignup=Y&modwhat=change_s&ReturnTo=') > 0){
							}else{
								var redirection = app_bphrm.readCookie('redirection');
									if( redirection === 'true'){
										window.location.href = 'https://www.biopharmasci.com/affiliate_signup.asp';
									}	
							}
						}, 2000);
						var sesion = app_bphrm.readCookie('session');
                        if(sesion === 'empty'){
							
						}else{
							if(sesion === 'y'){
                            var leer = app_bphrm.readCookie('Emailapolo');
                            if(leer === 'empty'){
                                var pathname = window.location.href;
                                if(pathname.indexOf('/myaccount.asp') > 0){
                                    var logeo = 'congratulation';
                                    app_bphrm.saveEmail(logeo,function(){
                                        var email = app_bphrm.readCookie('Emailapolo');
                                        app_bphrm.DataApolo(email);
                                    });
                                }else{
									var pato = window.location.href;
									if(pat.indexOf('AccountSettings.asp?NewSignup=Y&modwhat=change_s&ReturnTo=') > 0){
										app_bphrm.createCpokie('redirection','true','365');
									}else{
										window.location.href = 'https://www.biopharmasci.com/myaccount.asp';
									}
                                }
                            }else{
           		                var pathname = window.location.href; 
                                if(pathname.indexOf('/affiliate_signup.asp') > 0){ 
                                    var email = app_bphrm.readCookie('Emailapolo');
                                    app_bphrm.DataApolo(email);			
      		     			    }
                            }
                            $("#show-data-apolomultimedia").show();
           	            }else{
							app_bphrm.deleteCookie('Emailapolo');
						}
                    }
					}
                });
                var pathname = window.location.href; 
                if(pathname.indexOf('/affiliate_signup.asp') > 0){ 
                    $(".colors_lines_light").remove();
	                $( "input[name$='btnConfirm']" ).last().remove();
                }
                $("#botonSubidor" ).click(function(){
                    var inputFileImage = document.getElementById("archivoImage");
	                var file = inputFileImage.files[0];
	                var data = new FormData();
	                data.append('archivo',file);
	                var url = 'https://leaninbetween.com/biopharma/ajax/upload.php';
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
                    if($("#checkbox").is(':checked')){
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
                                            url:  'https://leaninbetween.com/biopharma/ajax/data.php',
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
			saveEmail:function(logeo,callback){
				if(logeo === 'congratulation'){			
    				$.ajax({
    					url: '/AccountSettings.asp?modwhat=change_a',
    					type: 'GET',
    					dataType:'html',
    					context: document.body,
    					success: function (data) {
    						data = data.replace(/(\r\n|\n|\r|\s+)/gm,"");
    						var email = data.replace(/.*inputname="Email"value="(.*?)"style.*/,'$1');
    						app_bphrm.createCpokie('Emailapolo',email,'365');
   							if(typeof callback == "function"){
  								callback();
   							}
    					}
    				});
				}
			},
        	DataApolo:function(email){
       		   $.ajax({
                    type: 'GET',
                    url: 'https://leaninbetween.com/biopharmasci/volusion/customers-email/'+email,
                    async:true,
                    jsonpCallback: 'jsonp_callback3',
                    contentType: "application/json",
                    dataType: 'jsonp',
                    success: function(r) {
                        var CustomidApolo = r.Customers.CustomerID || '';
                        var WebApolo = r.Customers.WebsiteAddress || '';
                        var FirstNameApolo = r.Customers.FirstName || '';
                        var LastNameApolo = r.Customers.LastName || '';
                        var EmailAddressApolo = r.Customers.EmailAddress || '';
                        var CompanyName =  r.Customers.CompanyName || '';
                        var BillingAddress1 = r.Customers.BillingAddress1 || '';
                        var BillingAddress2 = r.Customers.BillingAddress2 || '';
                        var City = r.Customers.City || '';
                        var State = r.Customers.State || '';
                        var PostalCode = r.Customers.PostalCode || '';
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
            },//CART
            isLogged:function(callback){
                $.ajax({
                    url: URI.lgg,
                    type: 'POST',
                    format: 'json',
                    data: null,
                    success: function (data){
                        if(typeof callback === 'function'){
                            callback(data);
                        }
                        /*
                        data = $.parseJSON(JSON.stringify(data));
   	                    if(!data.IsLoggedIn){
    	                }
                        if(data.IsLoggedIn){
                            var leer = app_bphrm.readCookie('Emailapolo');
                            if(leer === 'empty'){
                                var pathname = window.location.href;
                                if(pathname.indexOf('/myaccount.asp') > 0){
                                    var logeo = 'congratulation';
                                    app_bphrm.saveEmail(logeo,function(){
                                        var email = app_bphrm.readCookie('Emailapolo');
                                        app_bphrm.DataApolo(email);
                                    });
                                }else{
                                     window.location.href = 'https://www.biopharmasci.com/myaccount.asp';
                                }
                            }else{
           		                var pathname = window.location.href; 
                                if(pathname.indexOf('/affiliate_signup.asp') > 0){ 
                                    var email = app_bphrm.readCookie('Emailapolo');
                                    app_bphrm.DataApolo(email);			
      		     			    }
                            }
                            $("#show-data-apolomultimedia").show();
           	            }
                        */
                    }
                });
            },
            secform:function(){
                var taxes = this.getShippingAndTax();
                
                var prods = app_bphrm.cartjs.products; 
                //console.log(prods);
                var f='<form id="frm-bphrm" method="post" action="'+URI.chk+'" target="_top">';
                for(i in prods){
                    f += '<input type="text" name="product['+prods[i].code+']" value="'+prods[i].id+'|'+prods[i].name+'|'+prods[i].qty+'|'+prods[i].price+'|'+prods[i].img+'" />';
                }
                f +='<input type="hidden" name="action" value="chk" />';
                f += '<input type="hidden" name="email" value="'+app_bphrm.cartjs.email+'" />';
                f +='<input type="hidden" name="tax" value="'+taxes.tax+'" />';
                f +='<input type="hidden" name="shipp_value" value="'+taxes.shipping.value+'" />';
                f +='<input type="hidden" name="shipp_text" value="'+taxes.shipping.text+'" />';
                f +='</form>';
                if($(document).find('#frm-bphrm-content').length > 0 ){
                    //console.log('exist');
                    $('#frm-bphrm-content').html(f);
                }else{
                    //console.log('new form');
                    $('body').append('<div id="frm-bphrm-content">'+f+'</div>');
                }
                $('#frm-bphrm').submit();
            },
            getShippingAndTax:function(){
                var nums = [0,102];
                var response = {"shipping":{"value":0,"text":""},"tax":0};
                var tax = ($('.v65-cart-tax-cell').find('b').text()).replace(/[^0-9.,]/mg,'');
                if(/[0-9.,]+/.test(tax)){
                    response.tax = tax;
                }
                //console.log($('select[name="ShippingSpeedChoice"]'));
                var shippRateVal = $('select[name="ShippingSpeedChoice"]').find('option:selected').val();
                var shippRateText = ($('select[name="ShippingSpeedChoice"]').find('option:selected').text()).replace(/[^0-9.,\$]/mg,'').replace(/.*\$([0-9.,]+?)$/mg,'$1');
                console.log(shippRateVal);
                if(nums.indexOf(shippRateVal) < 0){
                    response.shipping.value = shippRateVal;
                    response.shipping.text = shippRateText;
                }
                return response;
            },
            cartapiContent:function(callback){
                app_bphrm.cartjs.prodsToArray();
                var cart_prods = app_bphrm.cartjs.products; 
                if($(document).find('.bphrm-content').length >= 1){
                    $(document).find('.bphrm-content').remove();
                }
                var total_items = app_bphrm.cartjs.countItems();
                var content = '<div class="bphrm-content dropup">';
                content += '<ul class="nav navbar-nav navbar-right">';
                content += '<li class="dropdown">';
                content += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span class="glyphicon glyphicon-shopping-cart"></span> '+total_items+' - Recurring Items<span class="caret"></span></a>';
                content +='<ul class="dropdown-menu dropdown-cart" role="menu">';
                if(cart_prods.length > 0){
                    for(i in cart_prods){
                        content += '<li>';
                        //
                        content += '<span class="item">';
                        content += '<span class="item-left">';
                        //content += '<img src="http://lorempixel.com/50/50/" alt="" />'
                        content +=   '<span class="item-info">';
                        content +=     '<span>'+cart_prods[i].name+'</span>';
                        content +=     '<span class="pull-left">Qty:'+cart_prods[i].qty+'</span> ';
                        content +=     '<span class="pull-right lnprice'+i+'">'+app_bphrm.checkProdPrice(cart_prods[i],'lnprice'+i,i)+'</span>';
                        content +=   '</span>';
                        content += '</span>';
                        //
                        content += '<span class="item-right"><button class="btn btn-xs btn-danger pull-right bphrm-item-del" code="'+cart_prods[i].code+'" line="'+i+'">x</button></span>';
                        content += '</span>';
                        content += '</li>';
                        /*
                        cart_prods[i].name  = prod[0];
                        cart_prods[i].qty   = prod[1];
                        cart_prods[i].code  = prod[2];
                        cart_prods[i].price = prod[3];
                        cart_prods[i].img   = prod[4];
                        */
                    }
                    content += '<li class="divider"></li>';
                    content += '<li><a class="text-center scfrm" href="#" target="_blank">Checkout</a></li>';
                }else{
                    content +='<li><span class="item"><p class="bg-warning text-center" style="padding:10px;">Empty</p></span></li>';
                }
                content += '</ul>';
                content += '</li>';
                content += '</ul>';
                content += '</div>';
                $('#'+CARTAPI_ID).html(content);
                if(typeof callback === 'function'){
                    callback(total_items);
                }
            },
            cartapiAdd:function(form,_this){//BTN ADD TO CART
                var inputs = $(form).serializeArray();
                var _select = $(form).find('select');
                var opt_text = _select.find('option:selected').text();
                var _class = (function(opt_text){
                    return '.'+opt_text.replace(/[^a-zA-Z0-9]/gm,'')+SUFIX;
                })(opt_text);
                var _json =  JSON.parse($(_class).text());
                //-----------------------------------
                // -- FILTER ITEM PROPERTIES BEGIN --
                //-----------------------------------
                var item = '';
                item = opt_text;//[0]->name
                for(i in inputs){
                    if(/^qty\..*/.test((inputs[i].name).toLowerCase())){
                        item += '|'+inputs[i].value;//[1]->quantity
                    }
                    if(/productcode/i.test((inputs[i].name).toLowerCase())){
                        PRODUCT_CODE = inputs[i].value;
                    }
                    //console.log(inputs[i].name+'='+inputs[i].value);
                }
                var item_code = '';
                for(j in _json.data['Empty']){
                    if(PRODUCT_CODE == _json.data['Empty'][j][1]){
                        item_code = _json.data['Empty'][j][0];
                        item += '|'+item_code;//[2]->code
                    }
                }
                item += '|'+'0.00';//[3]->price
                item += '|'+'http://';//[4]->image
                //-------------
                // ADD TO CART
                //-------------
                if(app_bphrm.cartjs.check(CARTNAME)){
                    //console.log('add coockie');
                    app_bphrm.cartjs.add(CARTNAME,item);
                }else{
                    //console.log('new coockie');
                    app_bphrm.cartjs.create(CARTNAME,item); 
                }
                app_bphrm.cartapiContent(function(total_items){
                    if(total_items > 0){
                        $('#'+CARTAPI_ID).css({'display':'block'});
                    }
                    //NATIVE FUNCTION
                    addToCart(form,_this);
                });
            },
            cartapiBuild:function(){
                var btn = '<div id="'+CARTAPI_ID+'"><p class="bg-info" style="padding:10px;">Recurring Cart</p></div>';
                $('body').append(btn);
                app_bphrm.cartapiContent(function(total_items){
                    if(total_items > 0){
                        $('#'+CARTAPI_ID).css({'display':'block'});
                    }
                });
                $(document).on('click','.bphrm-item-del',function(){
                    var code = $(this).attr('code');
                    app_bphrm.cartjs.delete(code);
                    app_bphrm.cartapiContent();
                });
                $(document).on('click','.scfrm',function(e){
                    e.preventDefault();
                    app_bphrm.secform();
                    
                });
                //TO CHANGE EVENT BUTTON
                //return true;
                $(BTNADDTOCART).attr('onclick','return app_bphrm.cartapiAdd(this.form,this);').attr('type','button');
                /*
                    TEST BUTTON
                */
                //$(BTNADDTOCART).after('<button type="button" class="btn btn-primary" onclick="return app_bphrm.cartapiAdd(this.form,this);" style="display:none;margin: 10px auto;">cart auto</button>');
                //$(BTNADDTOCART).remove();
            },
            cartapi:function(){
                //CART VARIABLES
                // -- PRODUCT PAGE --
                app_bphrm.cartjs.CARTNAME = CARTNAME;
                /* ***
                var _class = "div[class*='-ap']";
                if($(_class).length > 0){
                    //console.log($(_class).length);
                    app_bphrm.cartapiBuild();
                }
                *** */
                //native cart page
                $(document).on('click','#bphm-cart-chk',function(){
                    //var taxes = app_bphrm.getShippingAndTax();
                    //console.log(taxes);
                    //return false;
                    app_bphrm.isLogged(function(resp){
                        if(resp.IsLoggedIn == true){
                            var liam = app_bphrm.readCookie('Emailapolo');
                            app_bphrm.cartjs.email = liam;
                            app_bphrm.secform();
                        }else{
                            window.location.href = '/myaccount.asp';
                        }
                    });
                });
                if($('form[action="ShoppingCart.asp"]').length > 0){
                    app_bphrm.mapVlsnCart();
                }
            },
            productData:function(product,classname,sufix,callback){
                $.ajax({
                     type: 'GET',
                      url: URI.prdata+'/'+product.code,
                      data:{sufix:sufix},
                      async: true,
                      jsonpCallback: 'jsonp_callbacki'+sufix,
                      contentType: "application/json",
                      dataType: 'jsonp',
                      success: function(r) {
                        //console.log(r);
                        if(r.Products!='false' && r.Products!=false){
                            var rprice = parseFloat(r.Products.RecurringPrice);
                            var q = parseInt(product.qty);
                            $('.'+classname).text(CURRENCY+(rprice*q).toFixed(2));
                            if(typeof callback === 'function'){
                                callback(rprice);
                            }
                        }
                      },
                      error: function(e) {
                        alert(e.message);
                      }
                  });
            },
            checkProdPrice:function(product,classname,sufix){
                var p = parseFloat(product.price);
                var q = parseInt(product.qty);
                //console.log(product);
                if(p > 0){
                    return CURRENCY+(p*q).toFixed(2);
                    $('.'+classname).text(CURRENCY+(p*q).toFixed(2));
                }else{
                    app_bphrm.productData(product,classname,sufix,function(price){
                        product.price = price;
                        app_bphrm.cartjs.update(CARTNAME,product); 
                    });
                }
                return '0.00';
            },
            mapVlsnCart:function(){
                var __={
                    cart:{Products:[]},
                    itemTypes:{recurr:0,other:0,same:0},
                    types:{recurring:0,bimonthly:0,quarterly:0,count:0},//['recurring','bi-monthly','quarterly']
                    onlyNumbers:function(n){
                        return n.replace(/[^0-9.,]/,'');
                    },
                    checkConditions:function(product){
                        var _name = (product.ProductName).toLowerCase();
                        //console.log(_name+' - '+conditions+' '+conditions.indexOf(_name));
                        var result = 0;
                        for(i in conditions){
                            var str = conditions[i];
                            if(_name.indexOf(str) > -1){
                                switch(str){
                                    case 'bi-monthly': __.types.bimonthly += 1; __.types.count +=1; break;
                                    case 'quarterly':  __.types.quarterly += 1; __.types.count +=1; break;
                                    case 'recurring':  __.types.recurring += 1; __.types.count +=1; break;
                                }
                                result = 1; break;
                            }
                        }
                        //console.log(result);
                        if(result == 1){
                            __.itemTypes.recurr +=1;
                            return true;
                        }else{
                            __.itemTypes.other +=1;
                            return false;
                        }
                        //filter condition
                    },
                    isSameCondition:function(){
                        for(i in __.types){
                            if(parseInt(__.types[i]) == parseInt(__.types.count) && i != 'count'){
                                return true
                            }
                        }
                        return false;
                    },
                    gotoCheckout:function(){
                        //<input type="submit" id="" name="btn_checkout_guest" value="Proceed To Checkout" class="btn_checkout_guest btn btn-primary btn-lg btn_checkout_guest">
                        //$(BTNCHECKOUT).attr('type','button');//CHANGE TYPE
                        $(BTNCHECKOUT).after('<input type="button" id="bphm-cart-chk" class="btn_checkout_guest btn btn-primary btn-lg btn_checkout_guest"   value="Proceed To Checkout"/><br /><small>Recurring products</small>');//style="background: #222 none repeat scroll 0 0; border: medium none; bottom: 0; color: #555; position: absolute; right: 0;"
                        $(BTNCHECKOUT).remove();
                        app_bphrm.cartjs.products = [];
                        app_bphrm.cartjs.cartTotals = this.cart.Totals;
                        if((this.cart.Products).length > 0){
                            for(i in this.cart.Products){
                                app_bphrm.cartjs.products.push({id:this.cart.Products[i].ProductID,code:this.cart.Products[i].ProductCode,name:this.cart.Products[i].ProductName,qty:this.cart.Products[i].Quantity,price:__.onlyNumbers(this.cart.Products[i].ProductPrice),img:this.cart.Products[i].ImageSource});
                            }
                            //console.log(app_bphrm.cartjs.products);
                        }
                    }
                },
                ts = new Date().getTime();
                //
                $.getJSON('/ajaxcart.asp?cachebust=' + ts, function (data) {
                    var quantityTotal = 0;
                    //validate products
                    var isAllRecurr = true;
                    
                    __.cart = data;
                    $.each(data.Products, function (key, val) {
                        if (val.IsProduct === 'Y') {
                            if(!__.checkConditions(val)){ isAllRecurr=false; }
                            quantityTotal += parseInt(val.Quantity);
                        } else if (val.IsAccessory === 'Y') {
                            if(!__.checkConditions(val)){ isAllRecurr=false; }
                            quantityTotal += parseInt(val.Quantity);
                        }
                       
                    });
                    
                    quantityTotal = quantityTotal || '0';
                    //console.log(isAllRecurr);
                    
                    console.log(__.types);
                    //IS SAME CONDITION
                    var isSameCondition = __.isSameCondition();
                    //console.log('samecondition '+isSameCondition);
                    if(__.itemTypes.recurr > 0 && __.itemTypes.other == 0){
                        if(isSameCondition == false){
                            $(BTNCHECKOUT).hide().after('<div class="col-md-6 col-md-offset-6 alert alert-warning text-center">Product recurring intervals must be the same</div>');
                            $(BTNCHECKOUT).closest('form').attr('action','').attr('method','').attr('name','');
                            $(BTNCHECKOUT).remove();
                        }else{
                            __.gotoCheckout(data);
                        }
                    }else if(__.itemTypes.recurr > 0 && __.itemTypes.other > 0){
                        //console.log('Only you can choose recurring or not recurring products');
                        $(BTNCHECKOUT).hide().after('<div class="col-md-6 col-md-offset-6 alert alert-warning text-center">The cart can\'t be procesed because it has a recurring and no-recurring products.The recurring and non-recurring products can\'t be mixed.Please edit the cart to process the purchase</div>');
                        $(BTNCHECKOUT).closest('form').attr('action','').attr('method','').attr('name','');
                        $(BTNCHECKOUT).remove();
                    }else{
                        console.log('checkout without recurring');
                    }
                    
                });
            },
            init:function(action){
                switch(action){
                    case 'test':
                        app_bphrm.test();
                    break;
                    case 'env1':
                        app_bphrm.cartapi();
					    app_bphrm.env1();
                    break;
      		    }
            }
        }
    };
    app_bphrm = new app_bphrm();
    //cart
    app_bphrm.cartjs = {
        products:[],
        cartTotals:[],
        email:'',
        CARTNAME:'_cartname',
        ACTION:{ADD:'add',UPDATE:'update',QUANTITY:'quantity',DELETE:'delete'},
        createCookie: function(name,value,days){//mg
        	var expires = '';
        	if (days) {
        		var date = new Date();
        		date.setDate(date.getDate() + days);
        		expires = "; expires=" + date.toGMTString();
        	}
        	document.cookie = name + "=" + encodeURIComponent(value) + expires+"; path=/";
        },
        checkCookie: function($name) {//mg
            var username=this.getCookie($name);
            if (username!="" && typeof username !== 'undefined') {
                return true;
            }else{
                return false;
            }
        },
        addToCoockie: function(name,value){//mg
            var toAdd = this.getCookie(name);
            toAdd = (toAdd)+',,'+value;
            this.createCookie(name, toAdd);
        },
        getCookie: function(cname){
            name = cname += "=";
        	var cookie_start = document.cookie.indexOf(name);
        	if(cookie_start > -1) {
        		cookie_start = cookie_start+name.length;
        		cookie_end = document.cookie.indexOf(';', cookie_start);
        		if(cookie_end == -1) {
        			cookie_end = document.cookie.length;
        		}
        		return decodeURIComponent(document.cookie.substring(cookie_start, cookie_end));
        	}
        },
        check:function(name){
            return this.checkCookie(name);
        },
        create:function(name,item){
            this.createCookie(name,item);
        },
        add:function(name,item){
            //console.log('add');
            this.prodsToArray();
            this.action(this.CARTNAME,item,this.ACTION.ADD);
        },
        delete:function(prod_code){
            this.prodsToArray();
            this.action(this.CARTNAME,'0|1|'+prod_code,this.ACTION.DELETE);
        },
        update:function(name,item){
            this.prodsToArray();
            this.action(name,[item.name,item.qty,item.code,item.price,item.img],this.ACTION.UPDATE);
        },
        action:function(name,item,action){
            var prod = (typeof item === "object" && item.length !== 'undefined')?item:item.split('|');
            //console.log(this.products);
            var prod_exist=false;
            for(var i = 0; i < this.products.length; i++){
                //console.log(this.products[i].id+' '+prod[0]);
                if(this.products[i].code == prod[2]){
                    prod_exist = true;
                    if(action == this.ACTION.ADD){
                        this.products[i].qty = parseInt(this.products[i].qty) + parseInt(prod[1]);
                    }else if(action == this.ACTION.UPDATE){
                        //this.products[i] = {name:prod[0],qty:prod[1],code:prod[2],price:prod[3],img:prod[4]};
                        this.products[i].name  = prod[0];
                        this.products[i].qty   = prod[1];
                        this.products[i].code  = prod[2];
                        this.products[i].price = prod[3];
                        this.products[i].img   = prod[4];
                    }else if(action == this.ACTION.QUANTITY){
                        this.products[i].qty = prod[1];
                    }else if(action == this.ACTION.DELETE){
                        this.products.splice(i,1);
                    }
                }
            }
            if(prod_exist){
                this.createCookie(name,this.arrayToCoockie());
            }else{
                this.addToCoockie(name,item);
            }
        },
        prodsToArray:function(){
            //console.log('prodsToArray '+this.CARTNAME);
            var prods = this.getCookie(this.CARTNAME);
            if(typeof prods == 'undefined' || prods==''){
                console.log('prods is empty')
                return false;
            }
            prods = prods.split(',,');
            this.products = [];
            for(var i = 0; i < prods.length; i++){
                var prod = prods[i].split('|');
                this.products.push({name:prod[0],qty:prod[1],code:prod[2],price:prod[3],img:prod[4]});
            }
        },
        itemToArray:function(item){
            item = item.split('|');
            /* [0]->name,[1]->quantity,[2]->code,[3]->price,[4]->image */
            return item;
        },
        arrayToCoockie: function(){
            var str = '';
            for(var i = 0; i < this.products.length; i++){
                str += this.products[i].name+'|'+this.products[i].qty+'|'+this.products[i].code+'|'+this.products[i].price+'|'+this.products[i].img+',,';
            }
            return (str=='')?str:str.substring(0, str.length - 2);
        },
        calculateTotal: function(){
           var total = 0;
           for(var i = 0; i < this.products.length; i++){
               total += (parseInt(this.products[i].qty) * parseFloat(this.products[i].price));
           }
           return total.toFixed(2);
        },
        countItems:function(){
            var count = 0;
            for(var i = 0; i < this.products.length; i++){
                count += parseInt(this.products[i].qty);
            }
           return count;
        }        
    };
    window.app_bphrm = app_bphrm;
})(window);