//------------------------------------------
// 程序默认加载完界面调用 init 方法，可以在init中写加载完页面后的一些事件
conf.contract = {
		name:'合同协议',
		group:'文书档案',
		init:null,
		refresh: null,
		url: null
};
conf.contract.url = {
		page: '/houtai/contract/page',
		edit: '/houtai/contract/edit',
		save: '/houtai/contract/save'
};
conf.contract.$pageDom = null;
conf.contract.$datagrid = null;
conf.contract.init = function(){
	var $this = this;
	$('#contract-page-add').click(function(){
		var contract_edit_dlg = $('#contract_edit_dlg');
		if(contract_edit_dlg.size()==0) {
			$('<div id="contract_edit_dlg"></div>').appendTo('body');
		}
		var mis_page = $('#contract_edit_dlg');
		mis_page.dialog({
			title:'新增合同',
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
	conf.contract.$datagrid = $this.$pageDom.find('#contract-page-table');
};
conf.contract._bindClick = function(){
	var $this = this;
	$('#contract_edit_dlg').find('#contract-edit-save').click(function(){
		$.messager.progress({
			msg:'加载中...'
		});
		
		var data = $('#contract_edit_dlg').find('form').serialize();
		$.ajax({
			   type: "POST",
			   url: $this.url.save,
			   data: data,
			   success: function(msg){
			     if(msg.type == 'success'){
			    	 $.messager.alert('提示','添加成功','info');
			    	 $('#contract_edit_dlg').dialog("close");
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
	$('#contract_edit_dlg').find('#contract-edit-cancel').click(function(){
		$('#contract_edit_dlg').dialog("close");
	});
};
conf.contract.search = function(){
	 this.$datagrid.datagrid('load', {
		 contract_title: $('#search-contract-page input[name="contract_title"]').eq(0).val(),
	 });
};
conf.contract.edit = function(id){
	var $this = this;
	var contract_edit_dlg = $('#contract_edit_dlg');
	if(contract_edit_dlg.size()==0) {
		$('<div id="contract_edit_dlg"></div>').appendTo('body');
	}
	var mis_page = $('#contract_edit_dlg');
	mis_page.dialog({
		title:'新增合同',
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
conf.contract.format = function(val, row){
	return '<a href="javascript:conf.contract.edit(\'' + row.id + '\');">编辑</a>';
};