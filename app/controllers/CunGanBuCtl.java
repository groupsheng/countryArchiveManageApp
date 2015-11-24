/**
 * 
 */
package controllers;

import java.util.List;

import models.Butiekaizhi;
import models.CunGanBu;
import models.DatagridJson;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class CunGanBuCtl extends Controller{
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		CunGanBu cunGanBu = new CunGanBu();
		if (id != null) {
			cunGanBu = cunGanBu.findById(id);
		}
		render(cunGanBu);
	}

	// save.json
	public static void save(CunGanBu cunGanBu) {
		if (cunGanBu.id == null || cunGanBu.id.equals("")) {
			cunGanBu.id = null;
		}
		cunGanBu.save();
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
		List<CunGanBu> cunGanBus = Butiekaizhi
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = CunGanBu
				.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(cunGanBus);
		renderJSON(json);
	}

}
