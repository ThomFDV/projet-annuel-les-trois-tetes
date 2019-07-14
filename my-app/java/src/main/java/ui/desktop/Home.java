package ui.desktop;

import core.User;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Optional;

public class Home {

    @FXML
    private Label userName;

    @FXML
    private Button playGameButton;

    @FXML
    private Button createScenario;

    @FXML
    private Button profile;

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
    public void initialize() {

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
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    public void onCreateScenarioPressed() {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/SelectPlayersScenario.fxml"));
        try {
            AnchorPane pane = loader.load();
            mainContainer.setPrefWidth(pane.getPrefWidth());
            mainContainer.setPrefHeight(pane.getPrefHeight());
            SelectPlayersScenario selectPlayersScenarioController = loader.getController();
            selectPlayersScenarioController.setStage(mainApp);
            selectPlayersScenarioController.setMainContainer(mainContainer);
            selectPlayersScenarioController.setRunScenarioContainer(pane);
            mainContainer.setCenter(pane);
            mainApp.sizeToScene();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    public void onQuitPressed() {
        Alert returnAlert = new Alert(Alert.AlertType.WARNING);
        returnAlert.setTitle("Attention");
        returnAlert.setHeaderText("Voulez-vous vraiment quitter l'application ?");

        ButtonType confirm = new ButtonType("Oui");
        ButtonType cancel = new ButtonType("Non");
        returnAlert.getButtonTypes().clear();
        returnAlert.getButtonTypes().addAll(confirm, cancel);

        Optional<ButtonType> confirmationChoice = returnAlert.showAndWait();
        if(confirmationChoice.isPresent() && confirmationChoice.get() == confirm) {
            this.mainApp.close();
        }
    }

}
