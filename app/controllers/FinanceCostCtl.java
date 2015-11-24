/**
 * 
 */
package controllers;

import java.util.List;

import play.mvc.Controller;

import models.DatagridJson;
import models.JsonObj;
import models.FinanceCost;

/**
 * @author Coffee
 *
 */
public class FinanceCostCtl extends Controller{
	// 正文模块
		public static void page() {
			render();
		}

		// 编辑
		public static void edit(String id) {
			FinanceCost financeCost = new FinanceCost();
			if (id != null) {
				financeCost = FinanceCost.findById(id);
			}
			render(financeCost);
		}

		// save.json
		public static void save(FinanceCost financeCost) {
			if (financeCost.id == null || financeCost.id.equals("")) {
				financeCost.id = null;
			}
			financeCost.save();
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
			List<FinanceCost> financeCosts = FinanceCost
					.find("title like ? ", "%" + title + "%")
					.from(rows * (page - 1)).fetch(rows * page);
			int count = FinanceCost
					.find("title like ? ", "%" + title + "%")
					.fetch().size();
			DatagridJson json = new DatagridJson();
			json.total = count;
			json.rows.addAll(financeCosts);
			renderJSON(json);
		}

	}
