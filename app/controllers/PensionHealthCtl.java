/**
 * 
 */
package controllers;

import java.util.List;

import models.DatagridJson;
import models.PensionHealth;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class PensionHealthCtl extends Controller{
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		PensionHealth pensionHealth = new PensionHealth();
		if (id != null) {
			pensionHealth = PensionHealth.findById(id);
		}
		render(pensionHealth);
	}

	// save.json
	public static void save(PensionHealth pensionHealth) {
		if (pensionHealth.id == null || pensionHealth.id.equals("")) {
			pensionHealth.id = null;
		}
		pensionHealth.save();
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
		List<PensionHealth> pensionHealth = PensionHealth
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = PensionHealth
				.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(pensionHealth);
		renderJSON(json);
	}

}
