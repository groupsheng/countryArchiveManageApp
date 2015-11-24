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
 * @table 村容村貌实体类（声像档案）
 */
@Entity
public class CunRongCunMao extends GenericModel{
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 标题
	public String title;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 图片
	public String photos;
	
	// 图片介绍
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public CunRongCunMao() {}
	
}
