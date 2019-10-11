package com.gmail.grigorij;

import com.gmail.grigorij.backend.DummyDataGenerator;
import com.gmail.grigorij.backend.database.facades.TransactionFacade;
import com.gmail.grigorij.backend.entities.transaction.Transaction;
import com.gmail.grigorij.backend.enums.transactions.TransactionTarget;
import com.gmail.grigorij.backend.enums.transactions.TransactionType;
import com.gmail.grigorij.ui.utils.UIUtils;
import com.gmail.grigorij.ui.utils.css.LumoStyles;
import com.gmail.grigorij.ui.application.views.ApplicationContainerView;
import com.gmail.grigorij.ui.application.authentication.login.LoginView;
import com.gmail.grigorij.utils.AuthenticationService;
import com.gmail.grigorij.utils.OperationStatus;
import com.gmail.grigorij.utils.ProjectConstants;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.ErrorHandler;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.shared.communication.PushMode;
import com.vaadin.flow.theme.lumo.Lumo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *  Application UI entry point
 */
@Route("")
@Push(PushMode.MANUAL)
@PWA(name = ProjectConstants.PROJECT_NAME_FULL, shortName = ProjectConstants.PROJECT_NAME_FULL, iconPath = ProjectConstants.IMAGES_PATH + ProjectConstants.LOGO_IMG_ONLY_PNG)
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")

@CssImport("./styles/global-styles.css")
@CssImport(value = "./styles/notification-style.css", themeFor = "vaadin-notification-card")

public class MainLayout extends Div {

	private static final Logger log = LoggerFactory.getLogger(MainLayout.class);


	public MainLayout() {
		setSizeFull();
		addClassName("root");

		//TODO:REMOVE AT PRODUCTION
		DummyDataGenerator dummyDataGenerator = new DummyDataGenerator();


		if (UI.getCurrent() != null) {
			UI.getCurrent().getElement().setAttribute(LumoStyles.THEME, Lumo.DARK);
		} else {
			getElement().setAttribute(LumoStyles.THEME, Lumo.DARK);
		}

		VaadinSession.getCurrent().setErrorHandler((ErrorHandler) errorEvent -> {
			log.error("Uncaught UI exception", errorEvent.getThrowable());
			System.out.println("-------------CRITICAL UI ERROR-------------");
			System.out.println(errorEvent.getThrowable());
			UIUtils.showNotification("We are sorry, but an internal error occurred", UIUtils.NotificationType.ERROR);
		});

		System.out.println("\nAuthentication...");
		if (AuthenticationService.isAuthenticated()) {
			System.out.println("User authenticated -> construct main menu view");

			Transaction tr = new Transaction();
			tr.setWhoDid(AuthenticationService.getCurrentSessionUser());
			tr.setTransactionOperation(TransactionType.LOGIN);
			tr.setTransactionTarget(TransactionTarget.USER);
			tr.setAdditionalInfo("Login via 'Remember Me'");

			TransactionFacade.getInstance().insert(tr);

			showMainMenuLayout();
		} else {
			System.out.println("User not authenticated -> construct login view");
			showLoginView();
		}
	}


	private void showLoginView() {
		this.removeAll();

		add(new LoginView(new OperationStatus() {
			@Override
			public void onSuccess(String msg, UIUtils.NotificationType type) {
				showMainMenuLayout();
			}

			@Override
			public void onFail(String msg, UIUtils.NotificationType type) {
				System.out.println(msg);
			}
		}));
	}

	private void showMainMenuLayout() {
		this.removeAll();

		add(new ApplicationContainerView(this));
	}

	public void setThemeVariant(String themeVariant) {
		getElement().setAttribute(LumoStyles.THEME, "");
		if (UI.getCurrent() != null) {
			UI.getCurrent().getElement().setAttribute(LumoStyles.THEME, themeVariant);
		}
	}
}