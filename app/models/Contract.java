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
 * @table 合同协议实体类（文书档案）
 */

@Entity
public class Contract extends GenericModel {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	// 合同名称
	public String contract_title;
	
	// 甲方
	public String jiafang;
	
	// 乙方
	public String yifang;
	
	// 签订日期
	public String sign_date;
	
	// 发布日期--默认当前时间
	public String post_date;
	
	// 正文
	public String main_text;

	// 作者--默认当前登陆文书 
	public String author;

	// 附件
	public String appendix;
	
	public Contract() {}
}