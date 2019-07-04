package ui.desktop;

import core.enums.Difficulty;
import core.enums.Turn;
import core.game.Card;
import core.game.Deck;
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

    private Deck deck;

    @FXML
    private ChoiceBox<NumberPlayersChoice> nbPlayers;

    @FXML
    private GridPane listPlayersPane;

    @FXML
    private ChoiceBox<String> dealerBox;

    @FXML
    private ChoiceBox<Turn> turnBox;

    @FXML
    private ChoiceBox<Difficulty> difficultyBox;

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
        this.deck = new Deck();
        for(int i = 2; i <= 10; i++) {
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
        this.setUpCoicesValues();
    }

    /**
     * Lance la fonction de vérification de la saisie de l'utilisateur
     * et passe à l'étape suivante si tout est valide.
     * Sinon, affiche un message d'erreur
     * @TODO
     */

    @FXML
    public void onContinueScenarioClicked() {
        System.out.println("Vérifier inputs scénario");
    }

    /**
     * Demande à l'utilisateur si il veut vraiment abandonner la saisie du scénario
     * Si oui, renvoie au menu
     * @TODO
     */

    @FXML
    public void onReturnScenarioClicked() {

    }

    public void setUpCoicesValues() {
        for(Difficulty difficulty: Difficulty.values()) {
            difficultyBox.getItems().add(difficulty);
        }
        difficultyBox.getSelectionModel().selectFirst();
        for(Turn turn: Turn.values()) {
            if(turn != Turn.PREFLOP) turnBox.getItems().add(turn);
        }
        turnBox.getSelectionModel().selectFirst();
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
            addLineInGridPane("Vous", 0);
            for(int i = 1; i < selectedNumber; i++) {
                this.addLineInGridPane("Joueur " + i, i);
            }
        } else if(currentPlayersNumber < selectedNumber) {
            for(int i = currentPlayersNumber; i < selectedNumber; i++) {
                this.addLineInGridPane("Joueur " + i, i);
            }
        } else {

            for(int i = (currentPlayersNumber  * 4) - 1; i >= selectedNumber * 4; i--) {
                listPlayersPane.getChildren().remove(listPlayersPane.getChildren().get(i));
            }
        }
        this.updateDealerValues();
    }

    /**
     * Ajoute une ligne de saisie pour un nouveau joueur avec :
     * le nom, le champ de saisie du stack et de sa main
     * @param name
     * @param x
     */

    public void addLineInGridPane(String name, int x) {
        ChoiceBox<Card> card1 = this.generateChoiceBox();
        ChoiceBox<Card> card2 = this.generateChoiceBox();
        card1.getSelectionModel().selectFirst();
        card2.getSelectionModel().selectFirst();
        card2.getSelectionModel().selectFirst();
        listPlayersPane.add(new Label(name), 0, x);
        listPlayersPane.add(new TextFieldNumbersOnly("1000"), 1, x);
        listPlayersPane.add(card1, 2, x);
        listPlayersPane.add(card2, 3, x);
    }

    /**
     * Met à jour les valeurs possibles pour le choix du dealer
     */

    public void updateDealerValues() {
        dealerBox.getItems().clear();
        for(int i = 0; i < listPlayersPane.getChildren().size(); i += 4) {
            Label temp = (Label) listPlayersPane.getChildren().get(i);
            dealerBox.getItems().add(temp.getText());
        }
        dealerBox.getSelectionModel().selectFirst();
    }

    /**
     * Génère une nouvelle ChoiceBox pour chaque carte de chaque main de chaque joueur,
     * on ne peut pas utiliser la même à chaque fois car on ne peut pas ajouter
     * plusieurs fois le même objet dans une page
     * @return une ChoiceBox avec la liste des cartes
     */

    public ChoiceBox<Card> generateChoiceBox() {
        ChoiceBox<Card> newCardChoiceBox = new ChoiceBox<Card>();
        for(Card card: this.deck.getDecklist()) {
            newCardChoiceBox.getItems().add(card);
        }
        return newCardChoiceBox;
    }

}
