//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.cunRongCunMao = {
		name:'村容村貌',
		group:'声像档案',
		init:null,
		refresh: null,
		url: null
};
conf.cunRongCunMao.url = {
		page: '/houtai/cunRongCunMao/page',
		edit: '/houtai/cunRongCunMao/edit',
		save: '/houtai/cunRongCunMao/save'
};
conf.cunRongCunMao.$pageDom = null;
conf.cunRongCunMao.$datagrid = null;
conf.cunRongCunMao.init = function(){
	var $this = this;
	$('#cunRongCunMao-page-add').click(function(){
		var cunRongCunMao_edit_dlg = $('#cunRongCunMao_edit_dlg');
		if(cunRongCunMao_edit_dlg.size()==0) {
			$('<div id="cunRongCunMao_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#cunRongCunMao_edit_dlg');
		mis_page.dialog({
			title:'新增村容村貌',
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
	conf.cunRongCunMao.$datagrid = $this.$pageDom.find('#cunRongCunMao-page-table');
};
conf.cunRongCunMao._bindClick = function(){
	var $this = this;
	$('#cunRongCunMao_edit_dlg').find('#cunRongCunMao-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#cunRongCunMao_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#cunRongCunMao_edit_dlg').dialog("close");
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
	$('#cunRongCunMao_edit_dlg').find('#cunRongCunMao-edit-cancel').click(function(){
		$('#cunRongCunMao_edit_dlg').dialog("close");
	});
};
conf.cunRongCunMao.search = function(){
	 this.$datagrid.datagrid('load', {
		 title: $('#search-cunRongCunMao-page input[name="title"]').eq(0).val(),
	 });
};
conf.cunRongCunMao.edit = function(id){
	var $this = this;
	var cunRongCunMao_edit_dlg = $('#cunRongCunMao_edit_dlg');
	if(cunRongCunMao_edit_dlg.size()==0) {
		$('<div id="cunRongCunMao_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#cunRongCunMao_edit_dlg');
	mis_page.dialog({
		title:'新增村容村貌',
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
conf.cunRongCunMao.format = function(val, row){
	return '<a href="javascript:conf.cunRongCunMao.edit(\'' + row.id + '\');">编辑</a>';
};