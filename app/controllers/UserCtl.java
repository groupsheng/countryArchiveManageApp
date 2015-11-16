package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DatagridJson;
import models.JsonObj;
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
	public static void save(String userid, String username, String userrole) {
		
		try {
		System.out.println(new String(userid.getBytes("iso8859-1"),"UTF-8"));
		System.out.println(new String(username.getBytes("iso-8859-1"),"UTF-8"));
		System.out.println(userrole);
		}catch(Exception e) {
			System.out.println("xx");
		}
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = userid;
		renderJSON(json);
	}
	
	// get.json
	public static void get() {
		DatagridJson json = new DatagridJson();
		Map<String,String> tmp = new HashMap<String, String>();
		tmp.put("id", "01");
		tmp.put("userid", "123");
		tmp.put("username", "王某");
		tmp.put("phone", "12345678");
		Map<String,String> tmp2 = new HashMap<String, String>();
		tmp2.put("id", "02");
		tmp2.put("userid", "456");
		tmp2.put("username", "李某");
		tmp2.put("phone", "12345");
		json.total = 2;
		json.rows.add(tmp);
		json.rows.add(tmp2);
		renderJSON(json);
	}
}
