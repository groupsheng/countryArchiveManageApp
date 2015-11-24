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
 * @table 村干部实体类（声像档案）
 */
@Entity
public class CunGanBu extends GenericModel{
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 姓名
	public String name;
	
	// 职位
	public String position;
	
	// 个人图片
	public String personal_photo;
	
	// 个人简介
	public String profile;
	
	// 工作职责
	public String duty;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public CunGanBu() {}
	
}