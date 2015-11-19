package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;
@Entity
public class Power extends GenericModel {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	/**
	 * 权限名
	 */
	public String name;
	
	/**
	 * 权限代码
	 */
	public String code;
	/**
	 * 父功能
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	public Power parent = null;
	
	/**
	 * 子功能
	 */
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	@OrderBy(value = "orderIndex asc")
	public List<Power> children = null;
	
	/**
	 * 排序号
	 */
	public int orderIndex = 0;
	
	/**
	 * 类型
	 */
	public int type;
	
	public Power() {
		
	}

}
