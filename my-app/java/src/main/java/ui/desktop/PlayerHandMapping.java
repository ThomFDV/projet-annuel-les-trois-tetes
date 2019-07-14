package ui.desktop;

import core.game.Player;
import javafx.scene.control.Label;

public class PlayerHandMapping {
    private CardImageView card1;
    private CardImageView card2;
    private Label playerName;
    private Label playerStack;
    private Player player;
    private double X = 0;
    private double Y = 0;

    public CardImageView getCard1() {
        return card1;
    }

    public CardImageView getCard2() {
        return card2;
    }

    public Label getPlayerName() {
        return playerName;
    }

    public Label getPlayerStack() {
        return playerStack;
    }

    public void setPlayerStack(String newStack) {
        this.playerStack.setText(newStack);
    }

    public PlayerHandMapping(int nbPlayers, Player player) {
        this.player = player;
        this.playerName = new Label(player.getName());
        this.playerStack = new Label(Integer.toString(player.getStack()));
        this.card1 = new CardImageView(player.getHand()[0].getImgPath());
        this.card2 = new CardImageView(player.getHand()[1].getImgPath());
        this.card1.getStyleClass().add("card1");
        this.card2.getStyleClass().add("card2");
        this.playerName.getStyleClass().add("playerName");
        this.setComponentsPositions(nbPlayers);
    }

    public void setComponentsPositions(int nbPlayers) {
        String name = this.player.getName();
        // position de l'utilisateur
        if(name == "Vous") {
            this.X = 500;
            this.Y = 515;
        // Position n°5
        } else if((name.equals("Joueur 1") && nbPlayers == 2) ||
                  (name.equals("Joueur 5") && nbPlayers == 10) ||
                  (name.equals("Joueur 2") && nbPlayers == 4) ||
                  (name.equals("Joueur 3") && nbPlayers == 6) ||
                  (name.equals("Joueur 4") && nbPlayers == 8)) {
            this.X = 500;
            this.Y = 30;
        // Position n°1
        } else if((name.equals("Joueur 1") && nbPlayers > 8 )) {
            this.X = 290;
            this.Y = 470;
        // Position n°9
        } else if((name.equals("Joueur 9") && nbPlayers == 10) ||
                  (name.equals("Joueur 8") && nbPlayers == 9)) {
            this.X = 710;
            this.Y = 470;
        // Position n°2
        } else if((name.equals("Joueur 1") && (nbPlayers > 4 && nbPlayers < 9)) ||
                  (name.equals("Joueur 2") && nbPlayers > 8))  {
            this.X = 130;
            this.Y = 350;
        // Position n°8
        } else if((name.equals("Joueur 4") && nbPlayers == 5) ||
                  (name.equals("Joueur 5") && nbPlayers == 6) ||
                  (name.equals("Joueur 6") && nbPlayers == 7) ||
                  (name.equals("Joueur 7") && (nbPlayers == 8 || nbPlayers == 9)) ||
                  (name.equals("Joueur 8") && nbPlayers == 10)) {
            this.X = 870;
            this.Y = 350;
        // Position n°3
        } else if((name.equals("Joueur 1") && (nbPlayers == 3 || nbPlayers == 4)) ||
                  (name.equals("Joueur 2") && (nbPlayers > 6 && nbPlayers < 9)) ||
                  (name.equals("Joueur 3") && nbPlayers > 8)) {
            this.X = 130;
            this.Y = 170;
        // Position n°7
        } else if((name.equals("Joueur 2") && nbPlayers == 3) ||
                  (name.equals("Joueur 3") && nbPlayers == 4) ||
                  (name.equals("Joueur 5") && nbPlayers == 7) ||
                  (name.equals("Joueur 6") && nbPlayers == 8) ||
                  (name.equals("Joueur 6") && nbPlayers == 9) ||
                  (name.equals("Joueur 7") && nbPlayers == 10)) {
            this.X = 870;
            this.Y = 170;
        // Position n°4
        } else if((name.equals("Joueur 2") && (nbPlayers > 4 && nbPlayers < 7)) ||
                  (name.equals("Joueur 3") && (nbPlayers > 6 && nbPlayers < 9)) ||
                  (name.equals("Joueur 4") && nbPlayers > 8)) {
            this.X = 290;
            this.Y = 75;
        // Position n°6
        } else if((name.equals("Joueur 3") && nbPlayers == 5) ||
                  (name.equals("Joueur 4") && (nbPlayers > 5 && nbPlayers < 8)) ||
                  (name.equals("Joueur 5") && (nbPlayers > 7 && nbPlayers < 10)) ||
                  (name.equals("Joueur 6") && nbPlayers == 10)) {
            this.X = 710;
            this.Y = 75;
        } else {
            System.out.println("Raté : " + name + ", nombre de joueurs: " + nbPlayers);
        }
        this.card1.setX(this.X);
        this.card1.setY(this.Y);
        this.card2.setX(this.X + 70);
        this.card2.setY(this.Y);
        this.playerName.setTranslateX(this.X);
        this.playerName.setTranslateY(this.Y + 90);
        this.playerStack.setTranslateX(this.X);
        this.playerStack.setTranslateY(this.Y + 120);
    }
}
