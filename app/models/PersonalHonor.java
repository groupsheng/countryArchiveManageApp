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
 * @table 个人荣誉实体类（荣誉档案）
 */
@Entity
public class PersonalHonor extends GenericModel{

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 荣誉公告名称
	public String title;

	// 荣誉荣誉级别【省，市，区】
	public String honorLevel;
	
	// 荣誉所属个人
	public String honorGroup;

	// 荣誉颁发单位
	public String awardedBy;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 公示正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public PersonalHonor() {}
}