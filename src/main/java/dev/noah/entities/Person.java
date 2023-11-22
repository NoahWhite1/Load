package dev.noah.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "person")
public class Person {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "p_id")
	private int pId;
	@Column(name = "username")
	private String username;
	@Column(name = "password")
	private String password;
	@OneToMany(mappedBy = "freightbroker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "freightbroker"})
	private transient List<FreightLoad> freightloads = new ArrayList<FreightLoad>();
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "a_level")
	private int aLevel;
	@Column(name = "email")
	private String email;
	@Column(name = "phone")
	private String phone;
	
	
	public Person() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Person(int pId, String username, String password, List<FreightLoad> freightloads, String firstName,
			String lastName, int aLevel, String email, String phone) {
		super();
		this.pId = pId;
		this.username = username;
		this.password = password;
		this.freightloads = freightloads;
		this.firstName = firstName;
		this.lastName = lastName;
		this.aLevel = aLevel;
		this.email = email;
		this.phone = phone;
	}


	public int getpId() {
		return pId;
	}


	public void setpId(int pId) {
		this.pId = pId;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public List<FreightLoad> getFreightloads() {
		return freightloads;
	}


	public void setFreightloads(List<FreightLoad> freightloads) {
		this.freightloads = freightloads;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public int getaLevel() {
		return aLevel;
	}


	public void setaLevel(int aLevel) {
		this.aLevel = aLevel;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	@Override
	public String toString() {
		return "Person [pId=" + pId + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", aLevel=" + aLevel + ", email=" + email + ", phone=" + phone + "]";
	}
	
}
