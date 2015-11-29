//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.gongzikaizhi = {
		name:'工资开支',
		group:'会计档案',
		init:null,
		refresh: null,
		url: null
};
conf.gongzikaizhi.url = {
		page: '/houtai/gongzikaizhi/page',
		edit: '/houtai/gongzikaizhi/edit',
		save: '/houtai/gongzikaizhi/save'
};
conf.gongzikaizhi.$pageDom = null;
conf.gongzikaizhi.$datagrid = null;
conf.gongzikaizhi.init = function(){
	var $this = this;
	$('#gongzikaizhi-page-add').click(function(){
		var gongzikaizhi_edit_dlg = $('#gongzikaizhi_edit_dlg');
		if(gongzikaizhi_edit_dlg.size()==0) {
			$('<div id="gongzikaizhi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#gongzikaizhi_edit_dlg');
		mis_page.dialog({
			title:'新增工资开支公告',
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
	conf.gongzikaizhi.$datagrid = $this.$pageDom.find('#gongzikaizhi-page-table');
};
conf.gongzikaizhi._bindClick = function(){
	var $this = this;
	$('#gongzikaizhi_edit_dlg').find('#gongzikaizhi-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#gongzikaizhi_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#gongzikaizhi_edit_dlg').dialog("close");
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
	$('#gongzikaizhi_edit_dlg').find('#gongzikaizhi-edit-cancel').click(function(){
		$('#gongzikaizhi_edit_dlg').dialog("close");
	});
};
conf.gongzikaizhi.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-gongzikaizhi-page input[name="title"]').eq(0).val(),
	 });
};
conf.gongzikaizhi.edit = function(id){
	var $this = this;
	var gongzikaizhi_edit_dlg = $('#gongzikaizhi_edit_dlg');
	if(gongzikaizhi_edit_dlg.size()==0) {
		$('<div id="gongzikaizhi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#gongzikaizhi_edit_dlg');
	mis_page.dialog({
		title:'新增工资开支公告',
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
conf.gongzikaizhi.format = function(val, row){
	return '<a href="javascript:conf.gongzikaizhi.edit(\'' + row.id + '\');">编辑</a>';
};