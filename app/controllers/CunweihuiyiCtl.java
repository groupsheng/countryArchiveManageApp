/**
 * 
 */
package controllers;

import java.util.List;

import models.DatagridJson;
import models.JsonObj;
import models.Cunweihuiyi;
import play.mvc.Controller;
import play.test.Fixtures;
/**
 * @author Coffee
 * 
 */
public class CunweihuiyiCtl extends Controller {

	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Cunweihuiyi cunweihuiyi = new Cunweihuiyi();
		if (id != null) {
			cunweihuiyi = Cunweihuiyi.findById(id);
		}
		render(cunweihuiyi);
	}


	// save.json
	public static void save(Cunweihuiyi cunweihuiyi) {
		if (cunweihuiyi.id == null || cunweihuiyi.id.equals("")) {
			cunweihuiyi.id = null;
		}
		cunweihuiyi.save();
		JsonObj json = new JsonObj();
		json.type = "success";
		json.data = "";
		renderJSON(json);
	}

	// get.json
	public static void get(int rows, int page, String meeting_title) {
		if (meeting_title == null) {
			meeting_title = "";
		}
		List<Cunweihuiyi> cunweihuiyis = Cunweihuiyi
				.find("meeting_title like ? ",
						"%" + meeting_title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Cunweihuiyi
				.find("meeting_title like ? ",
						"%" + meeting_title + "%").fetch()
				.size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(cunweihuiyis);
		renderJSON(json);
	}

}
