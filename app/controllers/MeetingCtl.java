/**
 * 
 */
package controllers;

import java.util.List;

import models.DatagridJson;
import models.Meeting;
import models.JsonObj;
import play.mvc.Controller;

/**
 * @author Coffee
 *
 */
public class MeetingCtl extends Controller{
	// 正文模块
	public static void page() {
		render();
	}

	// 编辑
	public static void edit(String id) {
		Meeting meeting = new Meeting();
		if (id != null) {
			meeting = Meeting.findById(id);
		}
		render(meeting);
	}

	// save.json
	public static void save(Meeting meeting) {
		if (meeting.id == null || meeting.id.equals("")) {
			meeting.id = null;
		}
		meeting.save();
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
		List<Meeting> meetings = Meeting
				.find("title like ? ", "%" + title + "%")
				.from(rows * (page - 1)).fetch(rows * page);
		int count = Meeting
				.find("title like ? ", "%" + title + "%")
				.fetch().size();
		DatagridJson json = new DatagridJson();
		json.total = count;
		json.rows.addAll(meetings);
		renderJSON(json);
	}

}
