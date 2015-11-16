
/**
配置
*/
var conf = [];
conf["出生证"] = {
	name:'出生证',
	group:'户籍证明',
	init: null,
	refresh: null,
	url:null
};
conf["出生证"].init = function() {
$.messager.progress({
			msg:'加载中...'
		});
};
conf["出生证"].url = {
	page:'/cunmin/huji/chusheng'
};
//-----------------------------------------
conf["身份证"] = {
	name:'身份证',
	group:'户籍证明',
	init: null,
	refresh: null,
	url:null
};
conf["身份证"].init = function() {

};
conf["身份证"].url = {
	page:'/cunmin/huji/shenfen'
};
//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf["用户管理"] = {
		name:'用户管理',
		group:'后台管理',
		init:null,
		refresh: null,
		url: null
};
conf["用户管理"].url = {
		page: '/houtai/user/page',
		edit: '/houtai/user/edit',
		save: '/houtai/user/save'
};
conf["用户管理"].init = function(){
	$.messager.progress({
			msg:'加载中...'
		});
	var $this = this;
	$('#user-page-add').click(function(){
		var user_edit_dlg = $('#user_edit_dlg');
		if(user_edit_dlg.size()==0) {
			$('<div id="user_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#user_edit_dlg');
		mis_page.dialog({
			title:'新增用户',
			width:400,
			height:300,
			modal:true			
		});
		$.messager.progress({
			msg:'加载中...'
		});
		$.ajax({
			type: "GET",
			url:$this.url.edit+'0', 
			success: function(htm){
				mis_page.html(htm);
				$.parser.parse(mis_page);
				$this._bindClick();
				//$.messager.progress('close');
			},
			error:function(){
				$.messager.progress('close');
				//$.messager.alert('提示','请求失败','error');
			}
		});
	});
};
conf["用户管理"]._bindClick = function(){
	var $this = this;
	$('#user_edit_dlg').find('#user-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#user_edit_dlg').find('form').serialize();
		//data = decodeURIComponent(data,true);//解决中文乱码
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success') {
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#user_edit_dlg').dialog("close");
			     } else {
			    	 $.messager.alert('提示','添加失败','error');
			     }
			     $.messager.progress('close');
			   },
			   error:function(){
					$.messager.progress('close');
					$.messager.alert('提示','请求失败','error');
			}
		});	
	});
	$('#user_edit_dlg').find('#user-edit-cancel').click(function(){
		$('#user_edit_dlg').dialog("close");
	});
};

