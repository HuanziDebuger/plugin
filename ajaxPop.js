;(function($){
	//设置默认的一些属性、方法、对象
	var PluginName = 'ajaxPop',//设置插件名
		 errorHtml = '<div class="errorBoxlh dn" style="position:fixed; padding:15px; z-index:16; left:40%; top:30%; text-align:center; width:200px; background:#fff;">\
			                <div class="errorCont" style="text-align:center;">\
			                	<h5 class="errorMessage" style="font:500 12px/12px simsun; color:#5e5e5e; padding-bottom:15px;line-height:20px;"></h5>\
			                	<a class="errorBtn" style="display:inline-block; background:#D00;color:#fff;padding:0 10px; height:28px; font:700 12px/28px simsun;">确定</a>\
			                </div>\
	                  </div>\
                      <div class="mask_lh dn" style="position:absolute; top:0; z-index:15; width:100%; background:#000; opacity:0.15;">\
        			  </div>';

	//构造函数
	function Plugin(element,options){
			this.element = element;//此处调用了传递进来的参数
			this.settings = options;
			this.message = this.settings.message;
			this.callback = this.settings.callback;
			this.int();//调用一下初始化方法；

	}
	//对象原型链继承——继承构造函数里面的属性 （原型（prototype）是一个空对象{}，它继承的是构造函数的属性进来）
	//extend方法的逻辑是，后面参数会覆盖前面的参数；
	$.extend(Plugin.prototype,{
		int:function(){
			thiz=this;
			//这里面可以调用this.element、this.settings 构造函数属性被继承过来
			//alert(this.callback);           
            var domHeight =$('body').height();
            $('body').append(errorHtml);
            $('.errorMessage').text(this.message);//错误提示语
            $('.errorBoxlh').show();
            $('.mask_lh').css('height',domHeight).show();
        	thiz.youFn01();
		},
		youFn01:function(){
			//为下面作用域做铺垫，防止闭包；定义下新的变量
			var fnCallback= this.callback;
			$('.errorBtn').click(function(){//点击确定按钮
                $('.errorBoxlh').remove();
                $('.mask_lh').remove();
                //此处涉及到一个闭包原理，不能直接拿到构造函数的this.callback属性，
            	fnCallback();//回调函数
               
                
            })
		}
		

	});
	/**
	 * [默认options 参数]
	 * @type {Object}
	 */
	var default_options ={
		message:'接口请求失败，请稍后再试！',
		callback:function(){}
	}

	//对外抛出调用的接口
	$.fn[PluginName]=function(options){
		//default_options 插件里定义的默认参数，options插件被调用是传递进来的参数
		//由于extend方法机制（后面覆盖前面），最终输出被调用是传递的参数
		options = $.extend({},default_options, options);
		this.each(function(){
			new Plugin($(this),options);
			
		});
		//方便链式调用
		return this;
		
	}

	
})(jQuery)