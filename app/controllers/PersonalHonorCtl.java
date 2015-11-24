/**
 * 
 */
package controllers;

import java.util.List;

import models.DatagridJson;
import models.Gongzikaizhi;
import models.JsonObj;
import models.PersonalHonor;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class PersonalHonorCtl extends Controller{
	
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		PersonalHonor personalHonor = new PersonalHonor();
		if (id != null) {
			personalHonor = PersonalHonor.findById(id);
		}
		render(personalHonor);
	}

	// save.json
	public static void save(PersonalHonor personalHonor) {
		if (personalHonor.id == null || personalHonor.id.equals("")) {
			personalHonor.id = null;
		}
		personalHonor.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}

	// get.json
	public static void get(int rows, int page, String title) {
		if (title == null) {
			title = "";
		}
		List<PersonalHonor> personalHonors = PersonalHonor
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Gongzikaizhi
				.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(personalHonors);
		renderJSON(json);
	}

}
