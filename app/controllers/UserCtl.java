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
	public static void edit() {
		render();
	}
	
	// save.json
	public static void save(User user) {
		user.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get() {
		List<User> users = User.findAll();
		DatagridJson json = new DatagridJson();
		json.total = users.size();
		json.rows.addAll(users);
		renderJSON(json);
	}
}
