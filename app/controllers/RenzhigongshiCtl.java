/**
 * 
 */
package controllers;

import java.util.List;

import models.Renzhigongshi;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class RenzhigongshiCtl extends Controller {

	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Renzhigongshi renzhigongshi = new Renzhigongshi();
		if (id != null) {
			renzhigongshi = Renzhigongshi.findById(id);
		}
		render(renzhigongshi);
	}

	// save.json
	public static void save(Renzhigongshi renzhigongshi) {
		if (renzhigongshi.id == null || renzhigongshi.id.equals("")) {
			renzhigongshi.id = null;
		}
		renzhigongshi.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}

	// get.json
	public static void get(int rows, int page, String renzhigongshi_title) {
		if (renzhigongshi_title == null) {
			renzhigongshi_title = "";
		}
		List<Renzhigongshi> renzhigongshis = Renzhigongshi
				.find("renzhigongshi_title like ? ", "%" + renzhigongshi_title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Renzhigongshi
				.find("renzhigongshi_title like ? ", "%" + renzhigongshi_title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(renzhigongshis);
		renderJSON(json);
	}

}
