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
 * @date 2015/11/23
 * 
 * @table 村委会议实体类（文书档案）
 */

@Entity
public class Cunweihuiyi extends GenericModel {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 会议名称
	public String meeting_title;
	
	// 会议日期
	public String meeting_date;
	
	// 地点
	public String meeting_place;
	
	// 主持人
	public String host;
	
	// 记录人
	public String recorder;
	
	// 研究主题
	public String discuss_item;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public Cunweihuiyi() {}
}