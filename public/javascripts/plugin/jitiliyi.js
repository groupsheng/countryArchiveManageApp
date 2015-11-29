//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.jitiliyi = {
		name:'集体收益',
		group:'会计档案',
		init:null,
		refresh: null,
		url: null
};
conf.jitiliyi.url = {
		page: '/houtai/jitiliyi/page',
		edit: '/houtai/jitiliyi/edit',
		save: '/houtai/jitiliyi/save'
};
conf.jitiliyi.$pageDom = null;
conf.jitiliyi.$datagrid = null;
conf.jitiliyi.init = function(){
	var $this = this;
	$('#jitiliyi-page-add').click(function(){
		var jitiliyi_edit_dlg = $('#jitiliyi_edit_dlg');
		if(jitiliyi_edit_dlg.size()==0) {
			$('<div id="jitiliyi_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#jitiliyi_edit_dlg');
		mis_page.dialog({
			title:'新增集体利益公告',
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
	conf.jitiliyi.$datagrid = $this.$pageDom.find('#jitiliyi-page-table');
};
conf.jitiliyi._bindClick = function(){
	var $this = this;
	$('#jitiliyi_edit_dlg').find('#jitiliyi-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#jitiliyi_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#jitiliyi_edit_dlg').dialog("close");
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
	$('#jitiliyi_edit_dlg').find('#jitiliyi-edit-cancel').click(function(){
		$('#jitiliyi_edit_dlg').dialog("close");
	});
};
conf.jitiliyi.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-jitiliyi-page input[name="title"]').eq(0).val(),
	 });
};
conf.jitiliyi.edit = function(id){
	var $this = this;
	var jitiliyi_edit_dlg = $('#jitiliyi_edit_dlg');
	if(jitiliyi_edit_dlg.size()==0) {
		$('<div id="jitiliyi_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#jitiliyi_edit_dlg');
	mis_page.dialog({
		title:'新增集体利益公告',
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
conf.jitiliyi.format = function(val, row){
	return '<a href="javascript:conf.jitiliyi.edit(\'' + row.id + '\');">编辑</a>';
};