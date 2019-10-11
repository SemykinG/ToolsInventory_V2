package com.gmail.grigorij.ui.components.forms.editable;

import com.gmail.grigorij.backend.database.facades.CompanyFacade;
import com.gmail.grigorij.backend.database.facades.InventoryFacade;
import com.gmail.grigorij.backend.entities.company.Company;
import com.gmail.grigorij.backend.entities.inventory.InventoryItem;
import com.gmail.grigorij.backend.enums.inventory.InventoryHierarchyType;
import com.gmail.grigorij.utils.ProjectConstants;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.data.converter.StringToBooleanConverter;

import java.util.List;

public class EditableCategoryForm extends FormLayout {

	private Binder<InventoryItem> binder;

	private InventoryItem category;
	private Company initialCompany;
	private boolean isNew;

	// FORM ITEMS
	private TextField nameField;
	private ComboBox<Company> companyComboBox;
	private ComboBox<InventoryItem> parentCategoryComboBox;


	public EditableCategoryForm() {

		constructFormItems();

		constructForm();

		constructBinder();
	}


	private void constructFormItems() {
		nameField = new TextField("Name");
		nameField.setRequired(true);

		parentCategoryComboBox = new ComboBox<>();

		companyComboBox = new ComboBox<>();
		companyComboBox.setLabel("Company");
		companyComboBox.setRequired(true);
		companyComboBox.setItems(CompanyFacade.getInstance().getAllCompanies());
		companyComboBox.setItemLabelGenerator(Company::getName);
		companyComboBox.addValueChangeListener(e -> {
			if (e != null) {
				if (e.getValue() != null) {
					parentCategoryComboBox.setValue(null);
					updateCategoriesComboBoxData(e.getValue());
				}
			}
		});

		parentCategoryComboBox.setItems();
		parentCategoryComboBox.setLabel("Parent Category");
		parentCategoryComboBox.setRequired(true);
		parentCategoryComboBox.setItemLabelGenerator(InventoryItem::getName);
	}

	private void constructForm() {
		setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1, FormLayout.ResponsiveStep.LabelsPosition.TOP));
		add(nameField);
		add(companyComboBox);
		add(parentCategoryComboBox);
	}

	private void constructBinder() {
		binder = new Binder<>(InventoryItem.class);

		binder.forField(nameField)
				.asRequired("Name is required")
				.bind(InventoryItem::getName, InventoryItem::setName);
		binder.forField(companyComboBox)
				.asRequired("Company is required")
				.bind(InventoryItem::getCompany, InventoryItem::setCompany);
		binder.forField(parentCategoryComboBox)
				.asRequired("Parent Category is required")
				.bind(InventoryItem::getParentCategory, InventoryItem::setParentCategory);
	}


	private void initDynamicFormItems() {

	}

	private void updateCategoriesComboBoxData(Company company) {
		List<InventoryItem> categories = InventoryFacade.getInstance().getAllCategoriesInCompany(company.getId());
		categories.add(0, InventoryFacade.getInstance().getRootCategory());

		/*
		When editing Category remove same category from Parent Category -> can't set self as parent
		 */
		if (initialCompany != null) {
			categories.removeIf((InventoryItem category) -> category.equals(this.category));
		}
		parentCategoryComboBox.setItems(categories);
	}


	public void setCategory(InventoryItem c) {
		category = c;
		isNew = false;
		binder.removeBean();

		if (category == null) {
			category = new InventoryItem();
			isNew = true;
		}
		category.setInventoryHierarchyType(InventoryHierarchyType.CATEGORY);

		try {
			initialCompany = category.getCompany();

			binder.readBean(category);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public InventoryItem getCategory() {
		try {
			binder.validate();

			if (binder.isValid()) {

				/*
				If category's company was changed, it must also be changed for all category children
				 */
				if (initialCompany != category.getCompany()) {
					for (InventoryItem ie : category.getChildren()) {
						ie.setCompany(category.getCompany());
					}
				}

				if (category.getParentCategory().equals(InventoryFacade.getInstance().getRootCategory())) {
					category.setParentCategory(null);
				}

				binder.writeBean(category);
				return category;
			}
		} catch (ValidationException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	public boolean isNew() {
		return isNew;
	}
}