package ui.desktop;

import core.User;
import core.enums.Action;
import core.enums.Status;
import core.enums.Turn;
import core.game.Card;
import core.game.GameInstance;
import core.game.Player;
import core.scenario.ScenarioActions;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Orientation;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Controller de l'écran de jeu
 */

public class PlayGame {
    public Stage mainStage;
    public BorderPane mainContainer;
    public AnchorPane playGameContainer;
    public AnchorPane previousContainer;

    private GameInstance gameInstance;

    private ArrayList<PlayerHandMapping> playerHandMappings;

    private ArrayList<ScenarioActions> actions;

    @FXML
    public StackPane boardPane;

    @FXML
    private Button betButton;

    @FXML
    private Button checkButton;

    @FXML
    private Button foldButton;

    @FXML
    private Button continueButton;

    @FXML
    private TextField betInput;

    @FXML
    private Button returnButton;

    @FXML
    public GridPane cardsBoardPane;

    @FXML
    public ScrollPane listPlayerActions;

    @FXML
    public Label activePlayerName;

    @FXML
    public Label activePlayerStack;

    @FXML
    public Label activePlayerFirstCard;

    @FXML
    public Label activePlayerSecondCard;

    @FXML
    public Label handTurn;

    @FXML
    private Label errorMessageLabel;

    @FXML
    public VBox actionList;


    public void setPlayGameContainer(AnchorPane pane) {
        playGameContainer = pane;
    }

    public void setStage(Stage stage) {
        mainStage = stage;
    }

    public void setMainContainer(BorderPane pane) {
        mainContainer = pane;
    }

    public void setGameInstance(GameInstance gameInstance) {
        this.gameInstance = gameInstance;
    }

    /**
     * Initialisation de l'instance de partie
     * @TODO: Récupérer tous les joueurs et créer la partie en fonction du résultat
     */

    public void startGame() {
        this.playerHandMappings = new ArrayList<PlayerHandMapping>();
        for(Player player: this.gameInstance.getPlayers()) {
            PlayerHandMapping phm = new PlayerHandMapping(this.gameInstance.getPlayers().size(), player);
            this.playGameContainer.getChildren().addAll(phm.getCard1(), phm.getCard2(), phm.getPlayerName(), phm.getPlayerStack());
            this.playerHandMappings.add(phm);
        }
        this.gameInstance.betBlinds();
        for(Player p: this.gameInstance.getPlayers()) {
            updatePlayerDisplay(p);
        }
        feedPlayerInfos(this.gameInstance.getActivePlayer());
    }

    /**
     * Initialisation du controller
     * - Ajout d'un listener pour empêcher le joueur de saisir des caractères autres
     *   que des chiffres dans le champ de saisie de la mise
     */

    @FXML
    public void initialize() {
        betInput.textProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.matches("\\d*")) {
                betInput.setText(newValue.replaceAll("[^\\d]", ""));
            }
        });
        this.handTurn.setText("");
        ImageView boardImg = new ImageView("ui/desktop/img/board.png");
        boardImg.setFitHeight(250);
        boardImg.setFitWidth(520);
        boardPane.getChildren().add(boardImg);
        cardsBoardPane = new GridPane();
        for(int i = 0; i < 5; i++) {
            ColumnConstraints column = new ColumnConstraints(100);
            cardsBoardPane.getColumnConstraints().add(column);
        }
        cardsBoardPane.getRowConstraints().add(new RowConstraints(50));
        cardsBoardPane.getRowConstraints().add(new RowConstraints(150));
        cardsBoardPane.getRowConstraints().add(new RowConstraints(50));
        boardPane.getChildren().add(cardsBoardPane);
        this.continueButton.setVisible(false);
        this.actions = new ArrayList<ScenarioActions>();
        this.errorMessageLabel.setText("");
    }

    /**
     * Alimente l'écran avec les informations du joueur passé en paramètre
     * @param player
     */

    @FXML
    public void feedPlayerInfos(Player player) {
        if(player.getName() == "Vous" && this.gameInstance.getCurrentTurn() == this.gameInstance.getEndTurn()) {
            this.goToLastScenarioScene();
        } else {
            activePlayerName.setText("Joueur : " + player.getName());
            activePlayerStack.setText("Stack : " + player.getStack());
            activePlayerFirstCard.setText(
                    this.gameInstance.getActivePlayer().getHand()[0].toString()
            );
            activePlayerSecondCard.setText(
                    this.gameInstance.getActivePlayer().getHand()[1].toString()
            );
            handTurn.setText(this.gameInstance.getCurrentTurn().toString());
        }
    }

    /**
     * Vérifie la valeur de la mise entrée par le joueur
     */

    @FXML
    public void onBetButtonClicked() {
        int betValue = -1;
        String betValueText = this.betInput.getText();
        if(betValueText.length() == 0) {
            this.errorMessageLabel.setText("Vous n'avez pas rentré de valeur pour la mise !");
            return;
        }
        try {
            betValue = Integer.parseInt(betValueText);
        } catch(NumberFormatException e) {
            e.printStackTrace();
        }
        Optional<String> errorMessage = this.gameInstance.checkBet(betValue);
        if(errorMessage.isPresent()) {
            this.errorMessageLabel.setText(errorMessage.get());
            return;
        }
        this.gameInstance.bet(betValue);
        updatePlayerDisplay(this.gameInstance.getActivePlayer());
        this.addPlayerAction(this.gameInstance.getActivePlayer(), Action.BET, betValue);
        int action = this.gameInstance.setNewCurrentPlayer(Action.BET);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.updateTurn();
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
        }
    }

    /**
     * Listener du bouton pour passer son tour
     * - Met à jour le status du joueur
     * - Détermine la prochaine action (finir la main, passer au tour suivant, passer au joueur suivant)
     */

    @FXML
    public void onFoldButtonClicked() {
        this.gameInstance.getActivePlayer().setStatus(Status.FOLD);
        this.addPlayerAction(this.gameInstance.getActivePlayer(), Action.FOLD, -1);
        int action = this.gameInstance.setNewCurrentPlayer(Action.FOLD);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.updateTurn();
                System.out.println("On doit passer au tour suivant !");
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 2:
                //TODO réinitialiser le scénario
                System.out.println("On doit finir la main !");
                break;
        }
    }

    /**
     * Listener du bouton pour faire parole
     */

    @FXML
    public void onCheckButtonClicked() {
        Optional<String> errorMessage = this.gameInstance.checkCheck();
        if(errorMessage.isPresent()) {
            this.errorMessageLabel.setText(errorMessage.get());
            return;
        }
        this.gameInstance.bet(0);
        this.addPlayerAction(this.gameInstance.getActivePlayer(), Action.CHECK, 0);
        this.gameInstance.getActivePlayer().setStatus(Status.CHECK);
        int action = this.gameInstance.setNewCurrentPlayer(Action.CHECK);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.updateTurn();
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
        }
    }

    /**
     * Listener pour le bouton de retour
     */

    @FXML
    public void onReturnButtonPressed() {
        Alert returnAlert = new Alert(Alert.AlertType.WARNING);
        returnAlert.setTitle("Attention");
        returnAlert.setHeaderText("Voulez-vous vraiment revenir à la page précédente ? Le scénario en cours sera réinitialisé");

        ButtonType confirm = new ButtonType("Oui");
        ButtonType cancel = new ButtonType("Non");
        returnAlert.getButtonTypes().clear();
        returnAlert.getButtonTypes().addAll(confirm, cancel);

        Optional<ButtonType> confirmationChoice = returnAlert.showAndWait();
        if(confirmationChoice.isPresent() && confirmationChoice.get() == confirm) {
            this.mainContainer.setCenter(previousContainer);
        }
    }

    /**
     * Met à jour le tour et affiche les cartes du plateau à sélectionner
     */

    public void updateTurn() {
        this.gameInstance.updateTurn();
        switch(this.gameInstance.getCurrentTurn()) {
            case FLOP:
                cardsBoardPane.add(new BoardCard(this.generateChoiceBox()), 0, 1);
                cardsBoardPane.add(new BoardCard(this.generateChoiceBox()), 1, 1);
                cardsBoardPane.add(new BoardCard(this.generateChoiceBox()), 2, 1);
                break;
            case RIVER:
                cardsBoardPane.add(new BoardCard(this.generateChoiceBox()), 3, 1);
                break;
            case TURN:
                cardsBoardPane.add(new BoardCard(this.generateChoiceBox()), 4, 1);
                break;
        }
    }

    /**
     * Génère une choicebox pour le choix des cartes sur le plateau
     * @return la choicebox
     */

    public ChoiceBox<Card> generateChoiceBox() {
        ChoiceBox<Card> newCardChoiceBox = new ChoiceBox<Card>();
        for(Card card: this.gameInstance.getDeck().getDecklist()) {
            newCardChoiceBox.getItems().add(card);
        }
        return newCardChoiceBox;
    }

    /**
     * Ajoute l'action à la liste des actions à l'écran
     * @param action
     */

    public void addPlayerAction(Player p, Action action, int value) {
        String verb = p.getName() == "Vous" ? " avez " : " a ";
        String labelValue;
        switch (action) {
            case CHECK:
                labelValue = p.getName() + verb + "fait parole";
                break;
            case BET:
                labelValue = p.getName() + verb + "misé " + value;
                break;
            case FOLD:
                labelValue = p.getName() + verb + "passé";
                break;
            default:
                labelValue = "";
                break;
        }
        actionList.getChildren().addAll(new Label(labelValue), new Separator(Orientation.HORIZONTAL));
        this.actions.add(new ScenarioActions(p.getName(), action, value));
    }

    public void resetInstance() {
        for(Player player: this.gameInstance.getPlayers()) {
            player.resetPlayer();
            updatePlayerDisplay(player);
        }
        this.gameInstance.setCurrentTurn(Turn.PREFLOP);
        cardsBoardPane.getChildren().clear();
        actionList.getChildren().clear();
        actions.clear();
        this.errorMessageLabel.setText("");
        this.continueButton.setVisible(false);
        this.gameInstance.betBlinds();
        for(Player p: this.gameInstance.getPlayers()) {
            updatePlayerDisplay(p);
        }
        feedPlayerInfos(this.gameInstance.getActivePlayer());
    }

    /**
     * - Lance la fonction de vérification de la saisie de l'utilisateur
     * - Appelle le prochain écran
     */

    public void goToLastScenarioScene() {
        this.continueButton.setVisible(true);
        Optional<String> errorMessage = this.checkInputs();
        if(errorMessage.isPresent()) {
            this.errorMessageLabel.setText(errorMessage.get());
            this.betButton.setDisable(true);
            this.checkButton.setDisable(true);
            this.foldButton.setDisable(true);
            return;
        }
        Alert returnAlert = new Alert(Alert.AlertType.INFORMATION);
        returnAlert.setTitle("Confirmation");
        returnAlert.setHeaderText("Vous êtes à la fin du scénario. Voulez-vous continuer ?");

        ButtonType confirm = new ButtonType("Continuer");
        ButtonType cancel = new ButtonType("Rester sur cette page");
        ButtonType reinitialize = new ButtonType("Réinitialiser");
        returnAlert.getButtonTypes().clear();
        returnAlert.getButtonTypes().addAll(confirm, cancel, reinitialize);

        Optional<ButtonType> confirmationChoice = returnAlert.showAndWait();
        if(confirmationChoice.isPresent() && confirmationChoice.get() == confirm) {
            this.loadNextPage();
        } else if(confirmationChoice.isPresent() && confirmationChoice.get() == reinitialize) {
            this.resetInstance();
        } else {
            this.betButton.setDisable(true);
            this.checkButton.setDisable(true);
            this.foldButton.setDisable(true);
        }
    }

    /**
     * Met à jour l'affichage des joueurs
     * @param player
     */

    public void updatePlayerDisplay(Player player) {
        for(PlayerHandMapping phm: this.playerHandMappings) {
            if(phm.getPlayerName().getText() == player.getName()) {
                phm.getPlayerStack().setText(Integer.toString(player.getStack()));
            }
        }
    }

    /**
     * Vérifie que l'utilisateur a bien choisi des cartes différentes
     * @return un éventuel message d'erreur
     */

    public Optional<String> checkInputs() {
        ArrayList<Card> selectedCards = new ArrayList<Card>();
        for(Node node: cardsBoardPane.getChildren()) {
            BoardCard card = (BoardCard) node;
            if(selectedCards.contains(card.getChoiceBoxValue())) {
                return Optional.of(card.getChoiceBoxValue() + " a été sélectionnée plusieurs fois");
            }
            selectedCards.add(card.getChoiceBoxValue());
        }
        return Optional.empty();
    }

    /**
     * Chargement du prochain écran
     */

    public void loadNextPage() {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/ValidScenario.fxml"));
        try {
            AnchorPane pane = loader.load();
            ValidScenario validScenarioController = loader.getController();
            validScenarioController.setMainStage(mainStage);
            validScenarioController.setMainContainer(mainContainer);
            validScenarioController.setValidScenarioContainer(pane);
            validScenarioController.previousContainer = this.playGameContainer;
            mainContainer.setCenter(pane);
            validScenarioController.setGameInstance(this.gameInstance);
            validScenarioController.setActions(this.actions);
            validScenarioController.generateFileName();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
