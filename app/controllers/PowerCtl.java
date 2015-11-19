package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DatagridJson;
import models.JsonObj;
import models.Power;
import play.mvc.Controller;

public class PowerCtl extends Controller {
	//列表
	public static void page() {		
		render();
    }
	
	//编辑
	public static void edit(String id) {
		Power power = new Power();
		if(id!=null) {
			power = Power.findById(id);
		}
		render(power);
	}
	
	// save.json
	public static void save(Power power) {
		if(power.id == null || power.id.equals("")) {
			power.id = null;
		}
		power.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}
	
	// get.json
	public static void get(int rows,int page,String name, String code) {
		if(name==null) {
			name="";
		}
		if(code==null) {
			code="";
		}
		System.out.println(1);
		List<Power> powers = Power.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").from(rows*(page-1)).fetch(rows*page);
		int count = Power.find("name like ? and code like ?", "%"+name+"%", "%"+code+"%").fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(powers);
		renderJSON(json);
	}

}
