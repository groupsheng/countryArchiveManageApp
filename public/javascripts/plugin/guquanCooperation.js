//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.guquanCooperation = {
		name:'股权合作',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.guquanCooperation.url = {
		page: '/houtai/guquanCooperation/page',
		edit: '/houtai/guquanCooperation/edit',
		save: '/houtai/guquanCooperation/save'
};
conf.guquanCooperation.$pageDom = null;
conf.guquanCooperation.$datagrid = null;
conf.guquanCooperation.init = function(){
	var $this = this;
	$('#guquanCooperation-page-add').click(function(){
		var guquanCooperation_edit_dlg = $('#guquanCooperation_edit_dlg');
		if(guquanCooperation_edit_dlg.size()==0) {
			$('<div id="guquanCooperation_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#guquanCooperation_edit_dlg');
		mis_page.dialog({
			title:'新增股权合作公告',
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
	conf.guquanCooperation.$datagrid = $this.$pageDom.find('#guquanCooperation-page-table');
};
conf.guquanCooperation._bindClick = function(){
	var $this = this;
	$('#guquanCooperation_edit_dlg').find('#guquanCooperation-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#guquanCooperation_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#guquanCooperation_edit_dlg').dialog("close");
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
	$('#guquanCooperation_edit_dlg').find('#guquanCooperation-edit-cancel').click(function(){
		$('#guquanCooperation_edit_dlg').dialog("close");
	});
};
conf.guquanCooperation.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-guquanCooperation-page input[name="title"]').eq(0).val(),
	 });
};
conf.guquanCooperation.edit = function(id){
	var $this = this;
	var guquanCooperation_edit_dlg = $('#guquanCooperation_edit_dlg');
	if(guquanCooperation_edit_dlg.size()==0) {
		$('<div id="guquanCooperation_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#guquanCooperation_edit_dlg');
	mis_page.dialog({
		title:'新增股权合作公告',
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
conf.guquanCooperation.format = function(val, row){
	return '<a href="javascript:conf.guquanCooperation.edit(\'' + row.id + '\');">编辑</a>';
};