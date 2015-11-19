//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.user = {
		name:'用户管理',
		group:'后台管理',
		init:null,
		refresh: null,
		url: null
};
conf.user.url = {
		page: '/houtai/user/page',
		edit: '/houtai/user/edit',
		save: '/houtai/user/save'
};
conf.user.$pageDom = null;
conf.user.$datagrid = null;
conf.user.init = function(){
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
			url:$this.url.edit, 
			success: function(htm){
				mis_page.html(htm);
				$.parser.parse(mis_page);
				$this._bindClick();
				$.messager.progress('close');
			},
			error:function(){
				$.messager.progress('close');
				$.messager.alert('提示','请求失败','error');
			}
		});
	});
	conf.user.$datagrid = $this.$pageDom.find('#user-page-table');
};
conf.user._bindClick = function(){
	var $this = this;
	$('#user_edit_dlg').find('#user-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#user_edit_dlg').find('form').serialize();
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
			     $this.$datagrid.datagrid('reload');
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
conf.user.search = function(){
	 this.$datagrid.datagrid('load', {
		 username: $('#search-user-page input[name="username"]').eq(0).val(),
		 fullname: $('#search-user-page input[name="fullname"]').eq(0).val()
	 });
};
conf.user.edit = function(id){
	var $this = this;
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
		type: "POST",
		data: {id:id},
		url:$this.url.edit, 
		success: function(htm){
			mis_page.html(htm);
			$.parser.parse(mis_page);
			$this._bindClick();
			$.messager.progress('close');
		},
		error:function(){
			$.messager.progress('close');
			$.messager.alert('提示','请求失败','error');
		}
	});
}
conf.user.format = function(val, row){
	return '<a href="javascript:conf.user.edit(\'' + row.id + '\');">编辑</a>';
};