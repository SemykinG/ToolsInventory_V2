package com.gmail.grigorij.ui.views.authentication;

import com.gmail.grigorij.backend.entities.embeddable.Person;
import com.gmail.grigorij.ui.utils.components.CustomDialog;
import com.gmail.grigorij.ui.utils.UIUtils;
import com.gmail.grigorij.utils.OperationStatus;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.validator.EmailValidator;


class PasswordRecovery {

	private OperationStatus operationStatus;

	PasswordRecovery(OperationStatus operationStatus) {
		this.operationStatus = operationStatus;
		constructPasswordRecoveryDialog();
	}

	private void constructPasswordRecoveryDialog() {
		EmailField emailField = new EmailField("E-mail");
		emailField.setMinWidth("400px");

		Binder<Person> binder = new Binder<>();
		binder.forField(emailField)
				.withValidator(new EmailValidator("This doesn't look like a valid email address"))
				.bind(Person::getEmail, Person::setEmail);

		CustomDialog dialog = new CustomDialog();
		dialog.setHeader(UIUtils.createH3Label("Password recovery"));
		dialog.setContent(new Span("Enter your email to reset your password"), emailField);

		dialog.getCancelButton().addClickListener(e -> dialog.close());

		dialog.getConfirmButton().setText("Send");
		dialog.getConfirmButton().addClickListener(e -> {
			binder.validate();
			if (binder.isValid()) {
				constructRecoveryEmail(emailField.getValue());
				dialog.close();
				operationStatus.onSuccess("Password recovery dialog closed from button", null);
			}
		});

		dialog.addDetachListener((DetachEvent event) -> {
			operationStatus.onSuccess("Password recovery dialog closed from detach event", null);
		});
		dialog.open();
	}

	private void constructRecoveryEmail(String emailAddress) {

		//CONSTRUCT EMAIL

		sendPasswordRecoveryEmail(emailAddress);
	}

	private void sendPasswordRecoveryEmail(String emailAddress) {

		//SEND EMAIL

		UIUtils.showNotification("Password recovery link has been sent to: " + emailAddress, UIUtils.NotificationType.INFO);
	}
}
