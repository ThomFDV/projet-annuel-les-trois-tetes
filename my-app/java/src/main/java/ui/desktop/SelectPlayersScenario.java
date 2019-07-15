package ui.desktop;

import core.enums.Difficulty;
import core.enums.Turn;
import core.game.Card;
import core.game.Deck;
import core.game.GameInstance;
import core.game.Player;
import core.scenario.NumberPlayersChoice;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.Optional;

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

    @FXML
    private TextField scenarioName;

    @FXML
    private Label errorMessage;

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
        this.errorMessage.setText("");
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
        this.scenarioName.textProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.matches("[A-Za-z\\s]")) {
                this.scenarioName.setText(newValue.replaceAll("[^A-Za-z\\s]", ""));
            }
        });
    }

    /**
     * Lance la fonction de vérification de la saisie de l'utilisateur
     * et passe à l'étape suivante si tout est valide.
     * Sinon, affiche un message d'erreur
     * @TODO
     */

    @FXML
    public void onContinueScenarioClicked() {
        Optional<String> errorMessage = checkScenarioInformations();
        if(errorMessage.isPresent()) {
            this.errorMessage.setText(errorMessage.get());
            return;
        }
        ArrayList<Player> players = new ArrayList<Player>();
        for(int i = 0; i < listPlayersPane.getChildren().size(); i += 4) {
            Label name = (Label)(listPlayersPane.getChildren().get(i));
            TextFieldNumbersOnly initialStack = (TextFieldNumbersOnly)(listPlayersPane.getChildren().get(i + 1));
            ChoiceBox cardOne = (ChoiceBox)(listPlayersPane.getChildren().get(i + 2));
            ChoiceBox cardTwo = (ChoiceBox)(listPlayersPane.getChildren().get(i + 3));
            Player player = new Player(
                    name.getText(),
                    Integer.parseInt(initialStack.getText()),
                    (Card) cardOne.getSelectionModel().getSelectedItem(),
                    (Card) cardTwo.getSelectionModel().getSelectedItem());
            players.add(player);
        }
        GameInstance newScenarioInstance = new GameInstance(
            players,
            1000,
            dealerBox.getSelectionModel().getSelectedItem(),
            turnBox.getSelectionModel().getSelectedItem(),
            scenarioName.getText().trim(),
            difficultyBox.getSelectionModel().getSelectedItem()
        );
        loadNextPage(newScenarioInstance);
    }

    /**
     * Demande à l'utilisateur si il veut vraiment abandonner la saisie du scénario
     * Si oui, renvoie au menu
     * @TODO
     */

    @FXML
    public void onReturnScenarioClicked() {
        Alert returnAlert = new Alert(Alert.AlertType.WARNING);
        returnAlert.setTitle("Attention");
        returnAlert.setHeaderText("Êtes-vous sûr(e) de vouloir abandonner la création du scénario ?");

        ButtonType confirm = new ButtonType("Confirmer");
        ButtonType cancel = new ButtonType("Annuler");
        returnAlert.getButtonTypes().clear();
        returnAlert.getButtonTypes().addAll(confirm, cancel);

        Optional<ButtonType> confirmationChoice = returnAlert.showAndWait();
        if(confirmationChoice.isPresent() && confirmationChoice.get() == confirm) {
            this.loadHomePage();
        }
    }

    public void setUpCoicesValues() {
        for(Difficulty difficulty: Difficulty.values()) {
            difficultyBox.getItems().add(difficulty);
        }
        difficultyBox.getSelectionModel().selectFirst();
        for(Turn turn: Turn.values()) {
            turnBox.getItems().add(turn);
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

    /**
     * Vérifie que les informations entrées par l'utilisateur sont correctes
     * @return un éventuel message d'erreur
     */

    public Optional<String> checkScenarioInformations() {
        // Vérifie que la somme des stacks de départ est conforme
        int sum = 0;
        for(int i = 1; i < listPlayersPane.getChildren().size(); i += 4) {
            TextFieldNumbersOnly stackValue = (TextFieldNumbersOnly) listPlayersPane.getChildren().get(i);
            sum += Integer.valueOf(stackValue.getText());
        }
        int supposedStackSum = 1000 * (listPlayersPane.getChildren().size() / 4);
        if(sum != supposedStackSum) {
            return Optional.of("La somme des stacks est incorrecte, elle doit être égale à " + supposedStackSum);
        }
        // Vérifie que le nom du scénario n'est pas vide
        if(scenarioName.getText().isBlank()) {
            return Optional.of("Le nom du scénario n'est pas renseigné");
        } else if(scenarioName.getText().length() > 50) {
            return Optional.of("Le nom du scénario est limité à 50 caractères");
        }
        // Vérifie que toutes les cartes sélectionnées sont différentes
        ArrayList<Card> selectedCards = new ArrayList<Card>();
        for(int i = 2; i < listPlayersPane.getChildren().size(); i += 4) {
            ChoiceBox cardBox = (ChoiceBox) listPlayersPane.getChildren().get(i);
            Card card = (Card) cardBox.getSelectionModel().getSelectedItem();
            if(selectedCards.contains(card)) {
                return Optional.of("La carte " + card + " apparait en double dans votre sélection");
            }
            selectedCards.add(card);
            cardBox = (ChoiceBox) listPlayersPane.getChildren().get(i + 1);
            card = (Card) cardBox.getSelectionModel().getSelectedItem();
            if(selectedCards.contains(card)) {
                return Optional.of("La carte " + card + " apparait en double dans votre sélection");
            }
            selectedCards.add(card);
        }
        return Optional.empty();
    }

    /**
     * Charge la page qui va dérouler le scénario
     * @param newScenarioInstance
     */

    public void loadNextPage(GameInstance newScenarioInstance) {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/PlayGame.fxml"));
        try {
            AnchorPane pane = loader.load();
            PlayGame playGameController = loader.getController();
            playGameController.setStage(mainStage);
            playGameController.setMainContainer(mainContainer);
            playGameController.setPlayGameContainer(pane);
            playGameController.previousContainer = selectPlayersScenarioContainer;
            mainContainer.setCenter(pane);
            playGameController.setGameInstance(newScenarioInstance);
            playGameController.startGame();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void loadHomePage() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/Home.fxml"));
            try {
                AnchorPane pane = loader.load();
                Home homeController = loader.getController();
                mainContainer.setCenter(pane);
                homeController.setMainApp(mainStage);
                homeController.setMainAppContainer(mainContainer);
            } catch(Exception e) {
                e.printStackTrace();
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
