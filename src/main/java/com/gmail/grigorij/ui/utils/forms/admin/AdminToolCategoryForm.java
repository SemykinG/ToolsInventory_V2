package com.gmail.grigorij.ui.utils.forms.admin;

import com.gmail.grigorij.backend.database.facades.CompanyFacade;
import com.gmail.grigorij.backend.database.facades.ToolFacade;
import com.gmail.grigorij.backend.entities.company.Company;
import com.gmail.grigorij.backend.entities.tool.HierarchyType;
import com.gmail.grigorij.backend.entities.tool.Tool;
import com.gmail.grigorij.ui.utils.components.FlexBoxLayout;
import com.gmail.grigorij.ui.utils.css.FlexDirection;
import com.gmail.grigorij.ui.utils.css.size.Left;
import com.gmail.grigorij.utils.ProjectConstants;
import com.gmail.grigorij.utils.converters.CustomConverter;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;

import java.util.List;

public class AdminToolCategoryForm extends FormLayout {

	private Binder<Tool> binder = new Binder<>(Tool.class);

	private Tool category;
	private boolean isNew;

	private ComboBox<Tool> categoriesComboBox;

	public AdminToolCategoryForm() {
		TextField categoryNameField = new TextField("Name");
		categoryNameField.setRequired(true);

		Select<String> categoryStatus = new Select<>(ProjectConstants.ACTIVE, ProjectConstants.INACTIVE);
		categoryStatus.setWidth("25%");
		categoryStatus.setLabel("Status");

		FlexBoxLayout categoryLayout = new FlexBoxLayout();
		categoryLayout.setFlexDirection(FlexDirection.ROW);
		categoryLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
		categoryLayout.add(categoryNameField, categoryStatus);
		categoryLayout.setComponentMargin(categoryStatus, Left.M);
		categoryLayout.setFlexGrow("1", categoryNameField);

		ComboBox<Company> companyComboBox = new ComboBox<>();
		companyComboBox.setItems(CompanyFacade.getInstance().getAllCompanies());
		companyComboBox.setItemLabelGenerator(Company::getName);
		companyComboBox.setLabel("Company");
		companyComboBox.setRequired(true);
		companyComboBox.addValueChangeListener(e -> {
			if (e != null) {
				if (e.getValue() != null) {
					updateCategoriesProvider(e.getValue());
				}
			}
		});

		categoriesComboBox = new ComboBox<>();
		categoriesComboBox.setItems(ToolFacade.getInstance().getEmptyList());
		categoriesComboBox.setLabel("Parent Category");
		categoriesComboBox.setItemLabelGenerator(Tool::getName);
		categoriesComboBox.setRequired(true);

//		UIUtils.setColSpan(2, categoryLayout);

//      Form layout
		setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1, FormLayout.ResponsiveStep.LabelsPosition.TOP));
		add(categoryLayout);
		add(companyComboBox);
		add(categoriesComboBox);

		binder.forField(categoryNameField)
				.asRequired("Name is required")
				.bind(Tool::getName, Tool::setName);
		binder.forField(categoryStatus)
				.asRequired("Status is required")
				.withConverter(new CustomConverter.StatusConverter())
				.bind(Tool::isDeleted, Tool::setDeleted);
		binder.forField(companyComboBox)
				.asRequired("Company is required")
				.withConverter(new CustomConverter.CompanyConverter())
				.bind(Tool::getCompanyId, Tool::setCompanyId);
		binder.forField(categoriesComboBox)
				.asRequired("Parent Category is required")
				.withConverter(new CustomConverter.ToolCategoryConverter())
				.bind(Tool::getParentCategory, Tool::setParentCategory);
	}

	private long initialCompanyId;

	public void setCategory(Tool c) {
		category = c;
		isNew = false;
		binder.removeBean();

		if (category == null) {
			category = Tool.getEmptyTool();
			isNew = true;
		}
		category.setHierarchyType(HierarchyType.CATEGORY);

		try {
			initialCompanyId = category.getCompanyId();

			binder.readBean(category);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Tool getCategory() {
		try {
			binder.validate();

			if (binder.isValid()) {
				binder.writeBean(category);

				/*
				If category company was changed, it must also be changed for all category children
				 */
				if (initialCompanyId != category.getCompanyId()) {
					for (Tool tool : category.getChildren()) {
						tool.setCompanyId(category.getCompanyId());
					}
				}

				System.out.println("getCategory()");
				System.out.println("parentCategory: " + category.getParentCategory());
				if (category.getParentCategory() != null)
					System.out.println("parentCategory name: " + category.getParentCategory().getName());

				return category;
			}
		} catch (ValidationException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	private void updateCategoriesProvider(Company company) {
		if (company.getId() <= 0) {
			System.err.println("Company ID is <= 0, company name: " + company.getName());
			return;
		}

		List<Tool> categories = ToolFacade.getInstance().getAllCategoriesInCompanyWithRoot(company.getId());

		categories.removeIf((Tool category) -> category.getId().equals(initialCompanyId));
		categoriesComboBox.setItems(categories);
	}

	public boolean isNew() {
		return isNew;
	}
}