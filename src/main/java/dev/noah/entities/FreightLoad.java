package dev.noah.entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "freight_load")
public class FreightLoad {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "f_id")
	private int f_id;
	@Column(name = "rate")
	private BigDecimal rate;
	@Column(name = "start_address")
	private String startAddress;
	@Column(name = "end_address")
	private String endAddress;
	@Column(name = "gas_cost")
	private BigDecimal gasCost;
	@Column(name = "driver_pay")
	private BigDecimal driverPay;
	@Column(name = "load_cost")
	private BigDecimal loadCost;
	@Column(name = "insurance_cost")
	private BigDecimal insuranceCost;
	@Column(name = "maintenance_cost")
	private BigDecimal maintenanceCost;
	@Column(name = "status")
	private int status;
	@ManyToOne
	@JsonIgnoreProperties({"freightloads","hibernateLazyInitializer", "handler"})
	@JoinColumn(name = "p_id")
	private Person freightBroker;
	
	public FreightLoad() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FreightLoad(int f_id, BigDecimal rate, String startAddress, String endAddress, BigDecimal gasCost,
			BigDecimal driverPay, BigDecimal loadCost, BigDecimal insuranceCost, BigDecimal maintenanceCost, int status,
			Person freightBroker) {
		super();
		this.f_id = f_id;
		this.rate = rate;
		this.startAddress = startAddress;
		this.endAddress = endAddress;
		this.gasCost = gasCost;
		this.driverPay = driverPay;
		this.loadCost = loadCost;
		this.insuranceCost = insuranceCost;
		this.maintenanceCost = maintenanceCost;
		this.status = status;
		this.freightBroker = freightBroker;
	}

	public int getF_id() {
		return f_id;
	}

	public void setF_id(int f_id) {
		this.f_id = f_id;
	}

	public BigDecimal getRate() {
		return rate;
	}

	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public String getStartAddress() {
		return startAddress;
	}

	public void setStartAddress(String startAddress) {
		this.startAddress = startAddress;
	}

	public String getEndAddress() {
		return endAddress;
	}

	public void setEndAddress(String endAddress) {
		this.endAddress = endAddress;
	}

	public BigDecimal getGasCost() {
		return gasCost;
	}

	public void setGasCost(BigDecimal gasCost) {
		this.gasCost = gasCost;
	}

	public BigDecimal getDriverPay() {
		return driverPay;
	}

	public void setDriverPay(BigDecimal driverPay) {
		this.driverPay = driverPay;
	}

	public BigDecimal getLoadCost() {
		return loadCost;
	}

	public void setLoadCost(BigDecimal loadCost) {
		this.loadCost = loadCost;
	}

	public BigDecimal getInsuranceCost() {
		return insuranceCost;
	}

	public void setInsuranceCost(BigDecimal insuranceCost) {
		this.insuranceCost = insuranceCost;
	}

	public BigDecimal getMaintenanceCost() {
		return maintenanceCost;
	}

	public void setMaintenanceCost(BigDecimal maintenanceCost) {
		this.maintenanceCost = maintenanceCost;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Person getFreightBroker() {
		return freightBroker;
	}

	public void setFreightBroker(Person freightBroker) {
		this.freightBroker = freightBroker;
	}

	@Override
	public String toString() {
		return "FreightLoad [f_id=" + f_id + ", rate=" + rate + ", startAddress=" + startAddress + ", endAddress="
				+ endAddress + ", gasCost=" + gasCost + ", driverPay=" + driverPay + ", loadCost=" + loadCost
				+ ", insuranceCost=" + insuranceCost + ", maintenanceCost=" + maintenanceCost + ", status=" + status
				+ ", freightBroker=" + freightBroker + "]";
	}
}
