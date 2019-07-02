package ui.desktop;

import core.User;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

import java.io.IOException;

public class Home {

    @FXML
    private Label userName;

    @FXML
    private Button playGameButton;

    private Stage mainApp;

    private Scene previousScene;

    private BorderPane mainContainer;

    private AnchorPane homePane;


    public AnchorPane getHomePane() {
        return this.homePane;
    }

    public void setMainApp(Stage main) {
        this.mainApp = main;
    }

    public void setPreviousApp(Scene previous) { this.previousScene = previous; }

    public void setMainAppContainer(BorderPane pane) {
        this.mainContainer = pane;
    }

    public Stage getMainApp() {
        return this.mainApp;
    }


    public void setUserName(String name) {
        userName.setText("Hello " + name);
    }

    @FXML
    public void onPlayGamePressed() {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/PlayGame.fxml"));
        try {
            AnchorPane pane = loader.load();
            PlayGame playGameController = loader.getController();
            playGameController.setStage(mainApp);
            playGameController.setMainContainer(mainContainer);
            playGameController.setPlayGameContainer(pane);
            mainContainer.setCenter(pane);
            playGameController.startGame();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    public void onProfilePressed() {
        System.out.println("Hello");
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/RunScenario.fxml"));
        try {
            AnchorPane pane = loader.load();
            mainContainer.setPrefWidth(pane.getPrefWidth());
            mainContainer.setPrefHeight(pane.getPrefHeight());
            RunScenario scenarioController = loader.getController();
            scenarioController.setStage(mainApp);
            scenarioController.setMainContainer(mainContainer);
            scenarioController.setRunScenarioContainer(pane);
            mainContainer.setCenter(pane);
            mainApp.sizeToScene();
            mainApp.setMinHeight(720);
            mainApp.setMaxHeight(720);
            mainApp.setMinWidth(1280);
            mainApp.setMaxWidth(1280);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
