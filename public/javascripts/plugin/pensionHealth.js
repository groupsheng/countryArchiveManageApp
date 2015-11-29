//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.pensionHealth = {
		name:'养老医疗',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.pensionHealth.url = {
		page: '/houtai/pensionHealth/page',
		edit: '/houtai/pensionHealth/edit',
		save: '/houtai/pensionHealth/save'
};
conf.pensionHealth.$pageDom = null;
conf.pensionHealth.$datagrid = null;
conf.pensionHealth.init = function(){
	var $this = this;
	$('#pensionHealth-page-add').click(function(){
		var pensionHealth_edit_dlg = $('#pensionHealth_edit_dlg');
		if(pensionHealth_edit_dlg.size()==0) {
			$('<div id="pensionHealth_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#pensionHealth_edit_dlg');
		mis_page.dialog({
			title:'新增养老医疗公告',
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
	conf.pensionHealth.$datagrid = $this.$pageDom.find('#pensionHealth-page-table');
};
conf.pensionHealth._bindClick = function(){
	var $this = this;
	$('#pensionHealth_edit_dlg').find('#pensionHealth-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#pensionHealth_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#pensionHealth_edit_dlg').dialog("close");
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
	$('#pensionHealth_edit_dlg').find('#pensionHealth-edit-cancel').click(function(){
		$('#pensionHealth_edit_dlg').dialog("close");
	});
};
conf.pensionHealth.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-pensionHealth-page input[name="title"]').eq(0).val(),
	 });
};
conf.pensionHealth.edit = function(id){
	var $this = this;
	var pensionHealth_edit_dlg = $('#pensionHealth_edit_dlg');
	if(pensionHealth_edit_dlg.size()==0) {
		$('<div id="pensionHealth_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#pensionHealth_edit_dlg');
	mis_page.dialog({
		title:'新增养老医疗公告',
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
conf.pensionHealth.format = function(val, row){
	return '<a href="javascript:conf.pensionHealth.edit(\'' + row.id + '\');">编辑</a>';
};