//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.renzhigongshi = {
		name:'任职公示',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.renzhigongshi.url = {
		page: '/houtai/renzhigongshi/page',
		edit: '/houtai/renzhigongshi/edit',
		save: '/houtai/renzhigongshi/save'
};
conf.renzhigongshi.$pageDom = null;
conf.renzhigongshi.$datagrid = null;
conf.renzhigongshi.init = function(){
	var $this = this;
	$('#renzhigongshi-page-add').click(function(){
		var renzhigongshi_edit_dlg = $('#renzhigongshi_edit_dlg');
		if(renzhigongshi_edit_dlg.size()==0) {
			$('<div id="renzhigongshi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#renzhigongshi_edit_dlg');
		mis_page.dialog({
			title:'新增任职公告',
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
	conf.renzhigongshi.$datagrid = $this.$pageDom.find('#renzhigongshi-page-table');
};
conf.renzhigongshi._bindClick = function(){
	var $this = this;
	$('#renzhigongshi_edit_dlg').find('#renzhigongshi-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#renzhigongshi_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#renzhigongshi_edit_dlg').dialog("close");
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
	$('#renzhigongshi_edit_dlg').find('#renzhigongshi-edit-cancel').click(function(){
		$('#renzhigongshi_edit_dlg').dialog("close");
	});
};
conf.renzhigongshi.search = function(){
	 this.$datagrid.datagrid('load', {
		 renzhigongshi_title: $('#search-renzhigongshi-page input[name="renzhigongshi_title"]').eq(0).val(),
	 });
};
conf.renzhigongshi.edit = function(id){
	var $this = this;
	var renzhigongshi_edit_dlg = $('#renzhigongshi_edit_dlg');
	if(renzhigongshi_edit_dlg.size()==0) {
		$('<div id="renzhigongshi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#renzhigongshi_edit_dlg');
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
conf.renzhigongshi.format = function(val, row){
	return '<a href="javascript:conf.renzhigongshi.edit(\'' + row.id + '\');">编辑</a>';
};