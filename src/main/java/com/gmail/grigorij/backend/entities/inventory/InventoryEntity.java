package com.gmail.grigorij.backend.entities.inventory;

import com.gmail.grigorij.backend.entities.EntityPojo;
import com.gmail.grigorij.backend.entities.company.Company;
import com.gmail.grigorij.backend.entities.embeddable.Location;
import com.gmail.grigorij.backend.entities.user.User;

import javax.persistence.*;
import java.sql.Date;
import java.util.*;


/**
 * Entity class works both as Category and Tool
 *
 * Grid element only accepts one object type
 *
 * Used by a TreeGrid in
 * @see com.gmail.grigorij.ui.views.navigation.inventory.Inventory
 *
 *
 * {@link #inventoryHierarchyType} defines if entity is a Category or a Tool
 *
 */

@Entity
@Table(name = "inventory_entities")
@NamedQueries({

		@NamedQuery(name="getAll",
				query="SELECT ie FROM InventoryEntity ie"),

		@NamedQuery(name="getAllByHierarchyType",
				query="SELECT ie FROM InventoryEntity ie WHERE" +
						" ie.inventoryHierarchyType = :type_var"),

		@NamedQuery(name="getAllInCompany",
				query="SELECT ie FROM InventoryEntity ie WHERE" +
						" ie.company IS NOT NULL AND" +
						" ie.company.id = :company_id_var"),

		@NamedQuery(name="getAllCategoriesInCompany",
				query="SELECT ie FROM InventoryEntity ie WHERE" +
						" ie.company IS NOT NULL AND" +
						" ie.company.id = :company_id_var and" +
						" ie.inventoryHierarchyType = :type_var"),

		@NamedQuery(name="getAllToolsInCompany",
				query="SELECT ie FROM InventoryEntity ie WHERE" +
						" ie.company IS NOT NULL AND" +
						" ie.company.id = :company_id_var AND" +
						" ie.inventoryHierarchyType = :type_var")
})
public class InventoryEntity extends EntityPojo {

	/*
	NULL parentCategory is root category
	 */
	@ManyToOne(cascade={CascadeType.REFRESH})
	@JoinColumn(name="parent_id")
	private InventoryEntity parentCategory;

	@OneToMany(mappedBy = "parentCategory", cascade={CascadeType.ALL}, orphanRemoval = true, fetch = FetchType.LAZY)
	private Set<InventoryEntity> children = new HashSet<>();

	/*
	Allows to keep track of item position in tree hierarchy and sort list -> Parent must be added before child
	 */
	@Column(name = "level")
	private Integer level = 1;

	/*
	Allows to easily identify if Entity is a tool or a category
	 */
	@Enumerated(EnumType.STRING)
	private InventoryHierarchyType inventoryHierarchyType = InventoryHierarchyType.TOOL;


	@Column(name = "name")
	private String name = "";

	@Column(name = "qr_code")
	private String qrCode = "";

	@Column(name = "serial_number")
	private String serialNumber = "";

	@Column(name = "sn_code")
	private String snCode = "";

	@Column(name = "rf_code")
	private String rfCode = "";

	@Column(name = "barcode")
	private String barcode = "";

	@Column(name = "manufacturer")
	private String manufacturer = "";

	@Column(name = "model")
	private String model = "";

	@Column(name = "tool_info")
	private String toolInfo = "";

	@Enumerated(EnumType.STRING)
	private ToolStatus usageStatus = null;

	@Column(name = "personal")
	private boolean personal = false;

	@Column(name = "owner")
	private String owner = "";

	@OneToOne
	private Company company = null;

	@OneToOne
	private User user = null;

	@OneToOne
	private User reservedByUser = null;

	@Column(name = "date_bought")
	private Date dateBought;

	@Column(name = "date_next_maintenance")
	private Date dateNextMaintenance;

	@Column(name = "price")
	private Double price = 0.00;

	@Column(name = "guarantee_months")
	private Integer guarantee_months = 0;

	@Embedded
	private Location currentLocation;


	//TODO: Last known GeoLocation



	public InventoryEntity() {}

	public InventoryEntity(InventoryEntity tool) {
		this.setName(tool.getName());
		this.setManufacturer(tool.getManufacturer());
		this.setModel(tool.getModel());
		this.setToolInfo(tool.getToolInfo());
		this.setSnCode(tool.getSnCode());
		this.setBarcode(tool.getBarcode());
		this.setCompany(tool.getCompany());
		this.setParentCategory(tool.getParentCategory());
		this.setUsageStatus(tool.getUsageStatus());
		this.setDateBought(tool.getDateBought());
		this.setDateNextMaintenance(tool.getDateNextMaintenance());
		this.setPrice(tool.getPrice());
		this.setGuarantee_months(tool.getGuarantee_months());
		this.setAdditionalInfo(tool.getAdditionalInfo());
	}

	public InventoryEntity getParentCategory() {
		return parentCategory;
	}
	public void setParentCategory(InventoryEntity parentCategory) {
		this.parentCategory = parentCategory;
	}

	public Set<InventoryEntity> getChildren() {
		return children;
	}
	public void setChildren(Set<InventoryEntity> children) {
		if (children != null) {
			if (children.size() > 0) {
				for (InventoryEntity child : children) {
					child.setLevel((this.level+1));
				}
			}
		}
		this.inventoryHierarchyType = InventoryHierarchyType.CATEGORY;
		this.children = children;
	}
	public void addChild(InventoryEntity ie) {
		ie.setLevel((this.level+1));
		this.inventoryHierarchyType = InventoryHierarchyType.CATEGORY;
		this.children.add(ie);
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}

	public String getToolInfo() {
		return toolInfo;
	}
	public void setToolInfo(String toolInfo) {
		this.toolInfo = toolInfo;
	}

	public ToolStatus getUsageStatus() {
		return usageStatus;
	}
	public void setUsageStatus(ToolStatus usageStatus) {
		this.usageStatus = usageStatus;
	}

	public boolean isPersonal() {
		return personal;
	}
	public void setPersonal(boolean personal) {
		this.personal = personal;
	}

	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getSnCode() {
		return snCode;
	}
	public void setSnCode(String snCode) {
		this.snCode = snCode;
	}

	public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public Date getDateBought() {
		return dateBought;
	}
	public void setDateBought(Date dateBought) {
		this.dateBought = dateBought;
	}

	public Date getDateNextMaintenance() {
		return dateNextMaintenance;
	}
	public void setDateNextMaintenance(Date dateNextMaintenance) {
		this.dateNextMaintenance = dateNextMaintenance;
	}

	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getGuarantee_months() {
		return guarantee_months;
	}
	public void setGuarantee_months(Integer guarantee_months) {
		this.guarantee_months = guarantee_months;
	}

	public Location getCurrentLocation() {
		return (this.currentLocation == null) ? new Location() : currentLocation;
	}
	public void setCurrentLocation(Location currentLocation) {
		this.currentLocation = currentLocation;
	}

	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}

	public InventoryHierarchyType getInventoryHierarchyType() {
		return inventoryHierarchyType;
	}
	public void setInventoryHierarchyType(InventoryHierarchyType inventoryHierarchyType) {
		this.inventoryHierarchyType = inventoryHierarchyType;
	}

	public boolean hasChildren() {
		return (this.getChildren().size() > 0);
	}


	public static InventoryEntity getEmptyTool() {
		InventoryEntity t = new InventoryEntity();
		t.setName("");
		t.setParentCategory(null);
		t.setManufacturer("");
		t.setModel("");
		t.setToolInfo("");
		t.setOwner("");
		t.setSnCode("");
		t.setBarcode("");
		t.setDateBought(null);
		t.setDateNextMaintenance(null);
		t.setPrice(null);
		t.setGuarantee_months(null);

		return t;
	}

	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getRfCode() {
		return rfCode;
	}
	public void setRfCode(String rfCode) {
		this.rfCode = rfCode;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public User getReservedByUser() {
		return reservedByUser;
	}
	public void setReservedByUser(User reservedByUser) {
		this.reservedByUser = reservedByUser;
	}

	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}

	public String getQrCode() {
		return qrCode;
	}
	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}


//	@Override
//	public String toString() {
//		StringBuilder sb = new StringBuilder();
//		sb.append("\nName: ").append(this.name);
//		sb.append("\nCompany: ").append(this.company.getName());
//		sb.append("\nHierarchyType ").append(this.inventoryHierarchyType.toString());
//
//		if (this.parentCategory != null) {
//			sb.append("\nParent Info: ").append(this.parentCategory);
//		}
//
//		return sb.toString();
//	}
}
