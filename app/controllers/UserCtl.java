package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DatagridJson;
import models.JsonObj;
import models.User;
import play.mvc.Controller;

public class UserCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		User user = new User();
		if(id!=null) {
			user = User.findById(id);
		}
		render(user);
	}
	
	// save.json
	public static void save(User user) {
		if(user.id == null || user.id.equals("")) {
			user.id = null;
		}
		user.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get(int rows,int page,String username, String fullname) {
		if(username==null) {
			username="";
		}
		if(fullname==null) {
			fullname="";
		}
		List<User> users = User.find("username like ? and fullname like ?", "%"+username+"%", "%"+fullname+"%").from(rows*(page-1)).fetch(rows*page);
		int count = User.find("username like ? and fullname like ?", "%"+username+"%", "%"+fullname+"%").fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(users);
		renderJSON(json);
	}

}
