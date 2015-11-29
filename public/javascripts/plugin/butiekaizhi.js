//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.butiekaizhi = {
		name:'补贴开支',
		group:'会计档案',
		init:null,
		refresh: null,
		url: null
};
conf.butiekaizhi.url = {
		page: '/houtai/butiekaizhi/page',
		edit: '/houtai/butiekaizhi/edit',
		save: '/houtai/butiekaizhi/save'
};
conf.butiekaizhi.$pageDom = null;
conf.butiekaizhi.$datagrid = null;
conf.butiekaizhi.init = function(){
	var $this = this;
	$('#butiekaizhi-page-add').click(function(){
		var butiekaizhi_edit_dlg = $('#butiekaizhi_edit_dlg');
		if(butiekaizhi_edit_dlg.size()==0) {
			$('<div id="butiekaizhi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#butiekaizhi_edit_dlg');
		mis_page.dialog({
			title:'新增补贴开支公告',
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
	conf.butiekaizhi.$datagrid = $this.$pageDom.find('#butiekaizhi-page-table');
};
conf.butiekaizhi._bindClick = function(){
	var $this = this;
	$('#butiekaizhi_edit_dlg').find('#butiekaizhi-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#butiekaizhi_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#butiekaizhi_edit_dlg').dialog("close");
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
	$('#butiekaizhi_edit_dlg').find('#butiekaizhi-edit-cancel').click(function(){
		$('#butiekaizhi_edit_dlg').dialog("close");
	});
};
conf.butiekaizhi.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-butiekaizhi-page input[name="title"]').eq(0).val(),
	 });
};
conf.butiekaizhi.edit = function(id){
	var $this = this;
	var butiekaizhi_edit_dlg = $('#butiekaizhi_edit_dlg');
	if(butiekaizhi_edit_dlg.size()==0) {
		$('<div id="butiekaizhi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#butiekaizhi_edit_dlg');
	mis_page.dialog({
		title:'新增补贴开支公告',
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
conf.butiekaizhi.format = function(val, row){
	return '<a href="javascript:conf.butiekaizhi.edit(\'' + row.id + '\');">编辑</a>';
};