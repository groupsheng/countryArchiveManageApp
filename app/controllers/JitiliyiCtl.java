/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.DatagridJson;
import models.Jitiliyi;
import models.JsonObj;
import models.FinanceCost;

/**
 * @author Coffee
 *
 */
public class JitiliyiCtl extends Controller{
	// 正文模块
		public static void page() {
			render();
		}

		// 编辑
		public static void edit(String id) {
			Jitiliyi jitiliyi = new Jitiliyi();
			if (id != null) {
				jitiliyi = Jitiliyi.findById(id);
			}
			render(jitiliyi);
		}

		// save.json
		public static void save(Jitiliyi jitiliyi) {
			if (jitiliyi.id == null || jitiliyi.id.equals("")) {
				jitiliyi.id = null;
			}
			jitiliyi.save();
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
			List<Jitiliyi> jitiliyis = Jitiliyi
					.find("title like ? ", "%" + title + "%")
					.from(rows * (page - 1)).fetch(rows * page);
			int count = Jitiliyi
					.find("title like ? ", "%" + title + "%")
					.fetch().size();
			DatagridJson json = new DatagridJson();
			json.total = count;
			json.rows.addAll(jitiliyis);
			renderJSON(json);
		}

	}
