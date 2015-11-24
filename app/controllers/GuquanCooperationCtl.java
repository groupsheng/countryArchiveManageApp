/**
 * 
 */
package controllers;

import java.util.List;

import models.GuquanCooperation;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class GuquanCooperationCtl extends Controller{
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		GuquanCooperation guquanCooperation = new GuquanCooperation();
		if (id != null) {
			guquanCooperation = GuquanCooperation.findById(id);
		}
		render(guquanCooperation);
	}

	// save.json
	public static void save(GuquanCooperation guquanCooperation) {
		if (guquanCooperation.id == null || guquanCooperation.id.equals("")) {
			guquanCooperation.id = null;
		}
		guquanCooperation.save();
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
		List<GuquanCooperation> guquanCooperations = GuquanCooperation
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = GuquanCooperation
				.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(guquanCooperations);
		renderJSON(json);
	}

}
