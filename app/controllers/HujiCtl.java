package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DatagridJson;
import play.mvc.Controller;

public class HujiCtl extends Controller {
	//出生证
	public static void chusheng() {
		render();
    }
	//身份证
	public static void shenfen() {
		render();
	}
	public static void shenfen_page(){
		render();
	}
	//请求JSON数据
	public static void userjson(){
		DatagridJson json = new DatagridJson();
		Map<String,String> tmp = new HashMap<String, String>();
		tmp.put("id", "01");
		tmp.put("userid", "123");
		tmp.put("username", "王某");
		Map<String,String> tmp2 = new HashMap<String, String>();
		tmp2.put("id", "02");
		tmp2.put("userid", "456");
		tmp2.put("username", "李某");
		json.total = 2;
		json.rows.add(tmp);
		json.rows.add(tmp2);
		renderJSON(json);
	}
}
