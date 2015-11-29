//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.activity = {
		name:'活动',
		group:'声像档案',
		init:null,
		refresh: null,
		url: null
};
conf.activity.url = {
		page: '/houtai/activity/page',
		edit: '/houtai/activity/edit',
		save: '/houtai/activity/save'
};
conf.activity.$pageDom = null;
conf.activity.$datagrid = null;
conf.activity.init = function(){
	var $this = this;
	$('#activity-page-add').click(function(){
		var activity_edit_dlg = $('#activity_edit_dlg');
		if(activity_edit_dlg.size()==0) {
			$('<div id="activity_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#activity_edit_dlg');
		mis_page.dialog({
			title:'新增活动',
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
	conf.activity.$datagrid = $this.$pageDom.find('#activity-page-table');
};
conf.activity._bindClick = function(){
	var $this = this;
	$('#activity_edit_dlg').find('#activity-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#activity_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#activity_edit_dlg').dialog("close");
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
	$('#activity_edit_dlg').find('#activity-edit-cancel').click(function(){
		$('#activity_edit_dlg').dialog("close");
	});
};
conf.activity.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-activity-page input[name="title"]').eq(0).val(),
	 });
};
conf.activity.edit = function(id){
	var $this = this;
	var activity_edit_dlg = $('#activity_edit_dlg');
	if(activity_edit_dlg.size()==0) {
		$('<div id="activity_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#activity_edit_dlg');
	mis_page.dialog({
		title:'新增会议',
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
conf.activity.format = function(val, row){
	return '<a href="javascript:conf.activity.edit(\'' + row.id + '\');">编辑</a>';
};