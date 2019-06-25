package ui.desktop;

import core.User;
import core.enums.Action;
import core.enums.GameType;
import core.enums.Status;
import core.game.Card;
import core.game.GameInstance;
import core.game.Player;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
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

    private GameInstance gameInstance;

    @FXML
    private Button betButton;

    @FXML
    private Button checkButton;

    @FXML
    private Button foldButton;

    @FXML
    private TextField betInput;

    @FXML
    public Label activePlayerName;

    @FXML
    public Label activePlayerStack;

    @FXML
    public Label activePlayerFirstCard;

    @FXML
    public Label activePlayerSecondCard;

    @FXML
    public Label boardCards;

    @FXML
    public Label handTurn;


    public void setPlayGameContainer(AnchorPane pane) {
        playGameContainer = pane;
    }

    public void setStage(Stage stage) {
        mainStage = stage;
    }

    public void setMainContainer(BorderPane pane) {
        mainContainer = pane;
    }

    /**
     * Initialisation de l'instance de partie
     * @TODO: Récupérer tous les joueurs et créer la partie en fonction du résultat
     */

    public void startGame() {
        ArrayList<User> players = new ArrayList<User>();
        players.add(new User("Michel"));
        players.add(new User("Andre"));
        players.add(new User("Pierre"));
        players.add(new User("Phillipe"));
        this.gameInstance = new GameInstance(players, GameType.QUICK, 1000);
        this.gameInstance.distributeHands();
        this.gameInstance.betBlinds();
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
        this.boardCards.setText("");
    }

    /**
     * Alimente l'écran avec les informations du joueur passé en paramètre
     * @param player
     */

    @FXML
    public void feedPlayerInfos(Player player) {
        activePlayerName.setText("Joueur : " + player.getUser().getPseudo().get());
        activePlayerStack.setText("Stack : " + player.getStack());
        activePlayerFirstCard.setText(
                this.gameInstance.getActivePlayer().getHand()[0].toString()
        );
        activePlayerSecondCard.setText(
                this.gameInstance.getActivePlayer().getHand()[1].toString()
        );
        handTurn.setText(this.gameInstance.getCurrentTurn().toString());
    }

    /**
     * Affiche les cartes du plateau
     */

    @FXML
    public void fillBoard() {
        String board = "";
        for(Card card: this.gameInstance.getBoard()) {
            board += card.toString() + "\n";
        }
        boardCards.setText(board);
    }

    /**
     * Vérifie la valeur de la mise entrée par le joueur
     */

    @FXML
    public void onBetButtonClicked() {
        int betValue = -1;
        String betValueText = this.betInput.getText();
        if(betValueText.length() == 0) {
            System.out.println("Empty bet");
            return;
        }
        try {
            betValue = Integer.parseInt(betValueText);
        } catch(NumberFormatException e) {
            e.printStackTrace();
        }
        Optional<String> errorMessage = this.gameInstance.checkBet(betValue);
        if(!errorMessage.isEmpty()) {
            System.out.println(errorMessage.get());
            return;
        }
        this.gameInstance.bet(betValue);
        int action = this.gameInstance.setNewCurrentPlayer(Action.BET);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.gameInstance.updateTurn();
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                fillBoard();
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
        int action = this.gameInstance.setNewCurrentPlayer(Action.FOLD);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.gameInstance.updateTurn();
                System.out.println("On doit passer au tour suivant !");
                break;
            case 2:
                //this.gameInstance.endHand();
                System.out.println("On doit finir la main !");
                break;
        }
    }

    @FXML
    public void onCheckButtonClicked() {
        Optional<String> errorMessage = this.gameInstance.checkCheck();
        if(!errorMessage.isEmpty()) {
            System.out.println(errorMessage.get());
            return;
        }
        this.gameInstance.bet(0);
        this.gameInstance.getActivePlayer().setStatus(Status.CHECK);
        int action = this.gameInstance.setNewCurrentPlayer(Action.CHECK);
        switch(action) {
            case 0:
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                break;
            case 1:
                this.gameInstance.updateTurn();
                feedPlayerInfos(this.gameInstance.getActivePlayer());
                fillBoard();
                break;
        }
    }
}
