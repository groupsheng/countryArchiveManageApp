package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DatagridJson;
import models.JsonObj;
import models.Role;
import play.mvc.Controller;

public class RoleCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		Role role = new Role();
		if(id!=null) {
			role = Role.findById(id);
		}
		render(role);
	}
	
	// save.json
	public static void save(Role user) {
		user.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get(int rows,int page,String name) {
		if(name==null) {
			name="";
		}
		List<Role> roles = Role.find("user like ?", "%"+name+"%").from(rows*(page-1)).fetch(rows*page);
		int count = Role.find("name like ?", "%"+name+"%").fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(roles);
		renderJSON(json);
	}

}
