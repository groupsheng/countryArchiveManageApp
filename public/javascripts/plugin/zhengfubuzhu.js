//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.zhengfubuzhu = {
		name:'政府补助',
		group:'会计档案',
		init:null,
		refresh: null,
		url: null
};
conf.zhengfubuzhu.url = {
		page: '/houtai/zhengfubuzhu/page',
		edit: '/houtai/zhengfubuzhu/edit',
		save: '/houtai/zhengfubuzhu/save'
};
conf.zhengfubuzhu.$pageDom = null;
conf.zhengfubuzhu.$datagrid = null;
conf.zhengfubuzhu.init = function(){
	var $this = this;
	$('#zhengfubuzhu-page-add').click(function(){
		var zhengfubuzhu_edit_dlg = $('#zhengfubuzhu_edit_dlg');
		if(zhengfubuzhu_edit_dlg.size()==0) {
			$('<div id="zhengfubuzhu_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#zhengfubuzhu_edit_dlg');
		mis_page.dialog({
			title:'新增政府补贴公告',
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
	conf.zhengfubuzhu.$datagrid = $this.$pageDom.find('#zhengfubuzhu-page-table');
};
conf.zhengfubuzhu._bindClick = function(){
	var $this = this;
	$('#zhengfubuzhu_edit_dlg').find('#zhengfubuzhu-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#zhengfubuzhu_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#zhengfubuzhu_edit_dlg').dialog("close");
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
	$('#zhengfubuzhu_edit_dlg').find('#zhengfubuzhu-edit-cancel').click(function(){
		$('#zhengfubuzhu_edit_dlg').dialog("close");
	});
};
conf.zhengfubuzhu.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-zhengfubuzhu-page input[name="title"]').eq(0).val(),
	 });
};
conf.zhengfubuzhu.edit = function(id){
	var $this = this;
	var zhengfubuzhu_edit_dlg = $('#zhengfubuzhu_edit_dlg');
	if(zhengfubuzhu_edit_dlg.size()==0) {
		$('<div id="zhengfubuzhu_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#zhengfubuzhu_edit_dlg');
	mis_page.dialog({
		title:'新增政府补贴公告',
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
conf.zhengfubuzhu.format = function(val, row){
	return '<a href="javascript:conf.zhengfubuzhu.edit(\'' + row.id + '\');">编辑</a>';
};