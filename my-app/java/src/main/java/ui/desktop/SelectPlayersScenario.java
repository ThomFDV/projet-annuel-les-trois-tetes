package ui.desktop;

import core.scenario.NumberPlayersChoice;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXML;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

/**
 * Cette classe gère l'écran d'initialisation de la création d'un scénario
 */

public class SelectPlayersScenario {

    public Stage mainStage;

    public BorderPane mainContainer;

    public AnchorPane selectPlayersScenarioContainer;

    private NumberPlayersChoice currentPlayers;

    @FXML
    private ChoiceBox<NumberPlayersChoice> nbPlayers;

    @FXML
    private GridPane listPlayersPane;

    public void setStage(Stage mainStage) {
        this.mainStage = mainStage;
    }

    public void setMainContainer(BorderPane mainContainer) {
        this.mainContainer = mainContainer;
    }

    public void setRunScenarioContainer(AnchorPane pane) {
        this.selectPlayersScenarioContainer = pane;
    }

    public SelectPlayersScenario() {

    }

    /**
     * - On initialise les différents choix possibles
     * - On génère les champs de saisie pour les différents joueurs
     */

    @FXML
    public void initialize() {
        for(int i = 2; i < 10; i++) {
            nbPlayers.getItems().add(new NumberPlayersChoice(i));
        }
        nbPlayers.getSelectionModel().selectFirst();
        this.currentPlayers = new NumberPlayersChoice(0);
        this.generatePlayersInputs();
        nbPlayers.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<NumberPlayersChoice>() {
            @Override
            public void changed(ObservableValue<? extends NumberPlayersChoice> observableValue, NumberPlayersChoice numberPlayersChoice, NumberPlayersChoice t1) {
                generatePlayersInputs();
            }
        });
    }

    /**
     * Crée à l'écran le nombre de zones de saisie correspondant au nombre
     * de joueurs désiré par l'utilisateur
     */

    public void generatePlayersInputs() {
        int currentPlayersNumber = this.currentPlayers.getNumberPlayers();
        this.currentPlayers = nbPlayers.getValue();
        int selectedNumber = this.currentPlayers.getNumberPlayers();
        if(currentPlayersNumber == 0) {
            listPlayersPane.add(new Label("Vous"), 0, 0);
            listPlayersPane.add(new TextFieldNumbersOnly("1000"), 1, 0);
            for(int i = 1; i < selectedNumber; i++) {
                listPlayersPane.add(new Label("Joueur " + i), 0, i);
                listPlayersPane.add(new TextFieldNumbersOnly("1000"), 1, i);
            }
        } else if(currentPlayersNumber < selectedNumber) {
            for(int i = currentPlayersNumber; i < selectedNumber; i++) {
                listPlayersPane.add(new Label("Joueur " + i), 0, i);
                listPlayersPane.add(new TextFieldNumbersOnly("1000"), 1, i);
            }
        } else {

            for(int i = (currentPlayersNumber  * 2) - 1; i >= selectedNumber * 2; i--) {
                listPlayersPane.getChildren().remove(listPlayersPane.getChildren().get(i));
            }
        }
    }

}
