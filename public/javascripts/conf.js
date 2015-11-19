$.extend($.fn.datagrid.defaults, {
	idField: "id",
	resizeHandle: "both",
	fit: true,
	striped: true,
	multiSort: true,
	fitColumns: true,
	autoRowHeight: true,
	nowrap: true,
	rownumbers: true,
	checkOnSelect: false,
	selectOnCheck: false,
	singleSelect: true,
	ctrlSelect: true,
	pagination: true,
	pageSize: 20,
	pageList: [
			10, 20, 30, 40, 50, 100
	],
});

/**
配置
*/
var conf = {};
conf.getPlugin = function(tab) {
	for(var plugin in conf) {
		if(conf[plugin].name == tab) {
			return conf[plugin];
		}
	}
	return null;
};

//----------------------------------------
conf.chusheng = {
	name:'出生证',
	group:'户籍证明',
	init: null,
	refresh: null,
	url:null
};
conf.chusheng.init = function() {
$.messager.progress({
			msg:'加载中...'
		});
};
conf.chusheng.url = {
	page:'/cunmin/huji/chusheng'
};
//-----------------------------------------
conf.shenfen = {
	name:'身份证',
	group:'户籍证明',
	init: null,
	refresh: null,
	url:null
};
conf.shenfen.init = function() {

};
conf.shenfen.url = {
	page:'/cunmin/huji/shenfen'
};