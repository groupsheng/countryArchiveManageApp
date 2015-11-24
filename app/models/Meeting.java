/**
 * 
 */
package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;

/**
 * @author Coffee
 * 
 * @date 2015/11/24
 * 
 * @table 会议实体类（声像档案）
 */
@Entity
public class Meeting extends GenericModel{
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 公告标题
	public String title;
	
	// 会议日期
	public String meeting_date;
	
	// 会议地点
	public String meeting_place;
	
	// 主持人
	public String host;
	
	// 记录人
	public String recorder;
	
	// 研究事项
	public String discuss_item;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 公示正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public Meeting() {}
	
}
