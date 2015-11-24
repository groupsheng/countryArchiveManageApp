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
 * @table 活动实体类（声像档案）
 */
@Entity
public class Activity extends GenericModel{
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 活动名称
	public String title;
	
	// 活动时间
	public String activity_date;
	
	// 参与人员
	public String involved_perple;
	
	// 活动地点
	public String activity_place;	
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 公示正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public Activity() {}
}
