//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.groupHonor = {
		name:'集体荣誉',
		group:'荣誉档案',
		init:null,
		refresh: null,
		url: null
};
conf.groupHonor.url = {
		page: '/houtai/groupHonor/page',
		edit: '/houtai/groupHonor/edit',
		save: '/houtai/groupHonor/save'
};
conf.groupHonor.$pageDom = null;
conf.groupHonor.$datagrid = null;
conf.groupHonor.init = function(){
	var $this = this;
	$('#groupHonor-page-add').click(function(){
		var groupHonor_edit_dlg = $('#groupHonor_edit_dlg');
		if(groupHonor_edit_dlg.size()==0) {
			$('<div id="groupHonor_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#groupHonor_edit_dlg');
		mis_page.dialog({
			title:'新增集体荣誉',
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
	conf.groupHonor.$datagrid = $this.$pageDom.find('#groupHonor-page-table');
};
conf.groupHonor._bindClick = function(){
	var $this = this;
	$('#groupHonor_edit_dlg').find('#groupHonor-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#groupHonor_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#groupHonor_edit_dlg').dialog("close");
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
	$('#groupHonor_edit_dlg').find('#groupHonor-edit-cancel').click(function(){
		$('#groupHonor_edit_dlg').dialog("close");
	});
};
conf.groupHonor.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-groupHonor-page input[name="title"]').eq(0).val(),
	 });
};
conf.groupHonor.edit = function(id){
	var $this = this;
	var groupHonor_edit_dlg = $('#groupHonor_edit_dlg');
	if(groupHonor_edit_dlg.size()==0) {
		$('<div id="groupHonor_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#groupHonor_edit_dlg');
	mis_page.dialog({
		title:'新增集体荣誉',
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
conf.groupHonor.format = function(val, row){
	return '<a href="javascript:conf.groupHonor.edit(\'' + row.id + '\');">编辑</a>';
};