
conf.role = {
		name:'角色管理',
		group:'后台管理',
		init:null,
		refresh: null,
		url: null
};
conf.role.url = {
		page: '/houtai/role/page',
		edit: '/houtai/role/edit',
		save: '/houtai/role/save'
};
conf.role.$pageDom = null;
conf.role.$datagrid = null;
conf.role.init = function(){
	var $this = this;
	$('#role-page-add').click(function(){
		var role_edit_dlg = $('#role_edit_dlg');
		if(role_edit_dlg.size()==0) {
			$('<div id="role_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#role_edit_dlg');
		mis_page.dialog({
			title:'新增角色',
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
	conf.role.$datagrid = $this.$pageDom.find('#role-page-table');
};
conf.role._bindClick = function(){
	var $this = this;
	$('#role_edit_dlg').find('#role-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#role_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success') {
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#role_edit_dlg').dialog("close");
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
	$('#role_edit_dlg').find('#role-edit-cancel').click(function(){
		$('#role_edit_dlg').dialog("close");
	});
};
conf.role.search = function(){
	 this.$datagrid.datagrid('load', {
		 name: $('#search-role-page input[name="name"]').eq(0).val(),
	 });
};
conf.role.edit = function(id){
	var $this = this;
	var role_edit_dlg = $('#role_edit_dlg');
	if(role_edit_dlg.size()==0) {
		$('<div id="role_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#role_edit_dlg');
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
conf.role.format = function(val, row){
	return '<a href="javascript:conf.role.edit(\'' + row.id + '\');">编辑</a>';
};