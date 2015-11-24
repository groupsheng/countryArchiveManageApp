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
 * @table 财务开支实体类（文书档案）
 */
@Entity
public class FinanceCost extends GenericModel{

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 开支项目名称
	public String title;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 经办人
	public String jingbanren;
	
	// 公示正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public FinanceCost() {}
}