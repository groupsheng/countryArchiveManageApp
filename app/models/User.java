package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;
@Entity
public class User extends GenericModel {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	public String id;
	
	/**
	 * 用户姓名
	 */
	public String fullname;
	
	/**
	 * 用户电话
	 */
	public String phone;
	
	/**
	 * 用户账号属性
	 */
	public String username;
	
	/**
	 * 角色属性
	 */
	@OneToMany(fetch = FetchType.LAZY)
	public List<Role> roles;
	
	/**
	 * 组织机构属性
	 */
	@OneToOne
	public Organization organization;
	
	public User() {
		
	}

}
