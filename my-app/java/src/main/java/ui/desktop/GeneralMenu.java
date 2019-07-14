package ui.desktop;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

/**
 * Container principal
 * Cela évitera de recharger la barre de menu à chaque nouvel écran
 */

public class GeneralMenu {

    public static Stage mainStage;

    public BorderPane generalMenuContainer;

    public Pane centerContainer;

    private Scene mainScene;

    private BorderPane generalContainer;

    public void setMainStage(Stage mainStage) {
        this.mainStage = mainStage;
    }

    public void setContainer(BorderPane pane) {
        generalMenuContainer = pane;
    }

    public void initRootElements(BorderPane borderPane) {
        this.generalContainer = borderPane;
        this.mainScene = new Scene(this.generalContainer);
    }

    public void setHomeContent() {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/Home.fxml"));
        try {
            AnchorPane pane = loader.load();
            Home homeController = loader.getController();
            generalMenuContainer.setCenter(pane);
            homeController.setMainApp(mainStage);
            homeController.setMainAppContainer(generalMenuContainer);
            homeController.setUserName("");
            this.centerContainer = pane;
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
