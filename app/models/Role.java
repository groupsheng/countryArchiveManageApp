package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;
@Entity
public class Role extends GenericModel {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	/**
	 * 角色名
	 */
	public String name;
	
	/**
	 * 描述
	 */
	public String remark;
	
	/**
	 * 权限
	 */
	@OneToMany(fetch = FetchType.LAZY)
	@OrderBy(value = "orderIndex asc, code asc")
	public List<Power> powers;
	
	public Role() {
		
	}

}
