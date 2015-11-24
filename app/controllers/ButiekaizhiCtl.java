/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.Butiekaizhi;
import models.DatagridJson;
import models.JsonObj;
import models.FinanceCost;

/**
 * @author Coffee
 *
 */
public class ButiekaizhiCtl extends Controller{
		// 正文模块
		public static void page() {
			render();
		}

		// 编辑
		public static void edit(String id) {
			Butiekaizhi butiekaizhi = new Butiekaizhi();
			if (id != null) {
				butiekaizhi = butiekaizhi.findById(id);
			}
			render(butiekaizhi);
		}

		// save.json
		public static void save(Butiekaizhi butiekaizhi) {
			if (butiekaizhi.id == null || butiekaizhi.id.equals("")) {
				butiekaizhi.id = null;
			}
			butiekaizhi.save();
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
			List<Butiekaizhi> butiekaizhis = Butiekaizhi
					.find("title like ? ", "%" + title + "%")
					.from(rows * (page - 1)).fetch(rows * page);
			int count = Butiekaizhi
					.find("title like ? ", "%" + title + "%")
					.fetch().size();
			DatagridJson json = new DatagridJson();
			json.total = count;
			json.rows.addAll(butiekaizhis);
			renderJSON(json);
		}

	}
