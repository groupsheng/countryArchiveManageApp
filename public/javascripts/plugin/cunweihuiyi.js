//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.cunweihuiyi = {
		name:'村委会议',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.cunweihuiyi.url = {
		page: '/houtai/cunweihuiyi/page',
		edit: '/houtai/cunweihuiyi/edit',
		save: '/houtai/cunweihuiyi/save'
};
conf.cunweihuiyi.$pageDom = null;
conf.cunweihuiyi.$datagrid = null;
conf.cunweihuiyi.init = function(){
	var $this = this;
	$('#cunweihuiyi-page-add').click(function(){
		var cunweihuiyi_edit_dlg = $('#cunweihuiyi_edit_dlg');
		if(cunweihuiyi_edit_dlg.size()==0) {
			$('<div id="cunweihuiyi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#cunweihuiyi_edit_dlg');
		mis_page.dialog({
			title:'新增村委会议',
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
	conf.cunweihuiyi.$datagrid = $this.$pageDom.find('#cunweihuiyi-page-table');
};
conf.cunweihuiyi._bindClick = function(){
	var $this = this;
	$('#cunweihuiyi_edit_dlg').find('#cunweihuiyi-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#cunweihuiyi_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#cunweihuiyi_edit_dlg').dialog("close");
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
	$('#cunweihuiyi_edit_dlg').find('#cunweihuiyi-edit-cancel').click(function(){
		$('#cunweihuiyi_edit_dlg').dialog("close");
	});
};
conf.cunweihuiyi.search = function(){
	 this.$datagrid.datagrid('load', {
		 meeting_title: $('#search-cunweihuiyi-page input[name="meeting_title"]').eq(0).val(),
	 });
};
conf.cunweihuiyi.edit = function(id){
	var $this = this;
	var cunweihuiyi_edit_dlg = $('#cunweihuiyi_edit_dlg');
	if(cunweihuiyi_edit_dlg.size()==0) {
		$('<div id="cunweihuiyi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#cunweihuiyi_edit_dlg');
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
conf.cunweihuiyi.format = function(val, row){
	return '<a href="javascript:conf.cunweihuiyi.edit(\'' + row.id + '\');">编辑</a>';
};