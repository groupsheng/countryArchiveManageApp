//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.buildingApprovals = {
		name:'建房批文',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.buildingApprovals.url = {
		page: '/houtai/buildingApprovals/page',
		edit: '/houtai/buildingApprovals/edit',
		save: '/houtai/buildingApprovals/save'
};
conf.buildingApprovals.$pageDom = null;
conf.buildingApprovals.$datagrid = null;
conf.buildingApprovals.init = function(){
	var $this = this;
	$('#buildingApprovals-page-add').click(function(){
		var buildingApprovals_edit_dlg = $('#buildingApprovals_edit_dlg');
		if(buildingApprovals_edit_dlg.size()==0) {
			$('<div id="buildingApprovals_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#buildingApprovals_edit_dlg');
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
	conf.buildingApprovals.$datagrid = $this.$pageDom.find('#buildingApprovals-page-table');
};
conf.buildingApprovals._bindClick = function(){
	var $this = this;
	$('#buildingApprovals_edit_dlg').find('#buildingApprovals-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#buildingApprovals_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#buildingApprovals_edit_dlg').dialog("close");
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
	$('#buildingApprovals_edit_dlg').find('#buildingApprovals-edit-cancel').click(function(){
		$('#buildingApprovals_edit_dlg').dialog("close");
	});
};
conf.buildingApprovals.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-buildingApprovals-page input[name="title"]').eq(0).val(),
	 });
};
conf.buildingApprovals.edit = function(id){
	var $this = this;
	var buildingApprovals_edit_dlg = $('#buildingApprovals_edit_dlg');
	if(buildingApprovals_edit_dlg.size()==0) {
		$('<div id="buildingApprovals_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#buildingApprovals_edit_dlg');
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
conf.buildingApprovals.format = function(val, row){
	return '<a href="javascript:conf.buildingApprovals.edit(\'' + row.id + '\');">编辑</a>';
};