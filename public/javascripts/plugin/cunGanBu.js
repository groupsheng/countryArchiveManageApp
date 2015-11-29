//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.cunGanBu = {
		name:'村干部',
		group:'声像档案',
		init:null,
		refresh: null,
		url: null
};
conf.cunGanBu.url = {
		page: '/houtai/cunGanBu/page',
		edit: '/houtai/cunGanBu/edit',
		save: '/houtai/cunGanBu/save'
};
conf.cunGanBu.$pageDom = null;
conf.cunGanBu.$datagrid = null;
conf.cunGanBu.init = function(){
	var $this = this;
	$('#cunGanBu-page-add').click(function(){
		var cunGanBu_edit_dlg = $('#cunGanBu_edit_dlg');
		if(cunGanBu_edit_dlg.size()==0) {
			$('<div id="cunGanBu_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#cunGanBu_edit_dlg');
		mis_page.dialog({
			title:'新增村干部',
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
	conf.cunGanBu.$datagrid = $this.$pageDom.find('#cunGanBu-page-table');
};
conf.cunGanBu._bindClick = function(){
	var $this = this;
	$('#cunGanBu_edit_dlg').find('#cunGanBu-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#cunGanBu_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#cunGanBu_edit_dlg').dialog("close");
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
	$('#cunGanBu_edit_dlg').find('#cunGanBu-edit-cancel').click(function(){
		$('#cunGanBu_edit_dlg').dialog("close");
	});
};
conf.cunGanBu.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-cunGanBu-page input[name="title"]').eq(0).val(),
	 });
};
conf.cunGanBu.edit = function(id){
	var $this = this;
	var cunGanBu_edit_dlg = $('#cunGanBu_edit_dlg');
	if(cunGanBu_edit_dlg.size()==0) {
		$('<div id="cunGanBu_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#cunGanBu_edit_dlg');
	mis_page.dialog({
		title:'新增村干部',
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
conf.cunGanBu.format = function(val, row){
	return '<a href="javascript:conf.cunGanBu.edit(\'' + row.id + '\');">编辑</a>';
};