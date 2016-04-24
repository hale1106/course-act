/*
/*
 * init：对象初始化（已在loading.js加载图片后调用）
 *
 * */
var Main = function(){

};

Main.prototype = {
  constructor: "Main",
  init: function(){

  }
};


ls={
	on:function(data,callback){
		console.log(data);
		//var a = 123;
		callback && callback(123);
	}
}

ls.on('data',function(a){
	console.log(a);
})