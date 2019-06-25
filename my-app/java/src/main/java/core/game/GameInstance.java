package core.game;

import core.User;
import core.enums.Action;
import core.enums.GameType;
import core.enums.Status;
import core.enums.Turn;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Optional;

/**
 * Instance d'une partie
 * Gère tout ce qui est relatif au déroulement d'une partie de poker
 */

public class GameInstance {

    private ArrayList<Card> board;
    private ArrayList<Player> players;
    private Deck deck;
    private int pot;
    private int smallBlind;
    private int bigBlind;
    private GameType gameType;
    private Player dealer;
    private Player activePlayer;
    private Turn currentTurn;
    private int lastBet;

    public GameInstance(ArrayList<User> users, GameType gameType, int initialStack) {
        this.players = new ArrayList<Player>();
        this.board = new ArrayList<Card>();
        this.bigBlind = initialStack / 100;
        this.smallBlind = this.bigBlind / 2;
        this.gameType = gameType;
        initializePlayers(users, initialStack);
        this.pot = 0;
        int indexOfDealer = (int) Math.random() * players.size();
        this.dealer = players.get(indexOfDealer);
        this.activePlayer = players.get((indexOfDealer + 3) % players.size());
        this.currentTurn = Turn.PREFLOP;
        this.lastBet = 0;
        this.deck = new Deck();
        this.deck.shuffleDeck();
    }

    /**
     * A la fin de chaque main, met chaque joueur au statut éliminé si ils n'ont plus de jetons,
     * sinon les réinitialise pour commencer la prochaine main
     */

    public void updatePlayersStatusForNextHand() {
        for(Player player: this.players) {
            if(player.getStatus() != Status.ELIMINATED) {
                if(player.getStack() == 0) {
                    player.setStatus(Status.ELIMINATED);
                } else {
                    player.setStatus(Status.INGAME);
                }
            }
        }
    }

    /**
     * Génère les instances de joueur de la partie, avec un statut par défaut à "En jeu"
     * @param users
     * @param initialStack
     */

    private void initializePlayers(ArrayList<User> users, int initialStack) {
        for(User user: users) {
            Player p = new Player(user, initialStack, Status.INGAME);
            p.setPersonnalPot(0);
            this.players.add(p);
        }
    }

    /**
     * Retourne le nombre de joueurs encore en jeu afin de savoir si la partie est finie ou non
     * @return nombre de joueurs encore en jeu
     */

    public int numberIngamePlayers() {
        int upPlayers = 0;
        for(Player player: players) {
            upPlayers += player.getStatus() == Status.INGAME ? 1 : 0;
        }
        return upPlayers;
    }

    /**
     * Augmente les valeurs des blindes (en fonction du type de partie)
     */

    public void increaseBlinds() {
        if(this.gameType == GameType.QUICK) {
            this.bigBlind *= 2;
        } else {
            this.bigBlind *= 1.5;
        }
        this.smallBlind = this.bigBlind / 2;
    }

    public ArrayList<Card> getBoard() {
        return board;
    }

    public void setBoard(ArrayList<Card> board) {
        this.board = board;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }

    public int getPot() {
        return pot;
    }

    public void setPot(int pot) {
        this.pot = pot;
    }

    public int getSmallBlind() {
        return smallBlind;
    }

    public void setSmallBlind(int smallBlind) {
        this.smallBlind = smallBlind;
    }

    public int getBigBlind() {
        return this.bigBlind;
    }

    public void setBigBlind(int bigBlind) {
        this.bigBlind = bigBlind;
    }

    public int getLastBet() {
        return this.lastBet;
    }

    public Player getActivePlayer() {
        return this.activePlayer;
    }

    public void setActivePlayer(Player player) {
        this.activePlayer = player;
    }

    public Player getDealer() {
        return this.dealer;
    }

    public void setLastBet(int value) {
        this.lastBet = value;
    }

    public Turn getCurrentTurn() {
        return this.currentTurn;
    }

    public void setCurrentTurn(Turn turn) {
        this.currentTurn = turn;
    }

    /**
     * Fait miser le joueur actif et met à jour la valeur du pot
     * @param betValue
     */

    public void bet(int betValue)  {
        this.activePlayer.addToLastBet(betValue);
        this.activePlayer.addToPersonnalPot(betValue);
        this.activePlayer.subtractFromStack(betValue);
        if(this.activePlayer.getStack() == 0) {
            this.activePlayer.setStatus(Status.ALLIN);
        } else {
            this.activePlayer.setStatus(Status.BET);
        }
        this.pot += betValue;
        this.lastBet = getActivePlayer().getLastBet();
        System.out.println(getActivePlayer().getUser().getPseudo() + " a misé " + betValue);
    }

    /**
     * Détermine le prochain joueur qui doit jouer
     * @param action
     * @return 2 si la main est finie
     * @return 1 si on doit passer au prochain tour de jeu
     * @return 0 si le tour continue de se dérouler
     */

    public int setNewCurrentPlayer(Action action) {
        if(action == Action.FOLD) {
            if(this.getInGamePlayers() == 1) return 2;
        }
        ArrayList<Status> status = new ArrayList<Status>();
        status.add(Status.INGAME);
        status.add(Status.BET);
        status.add(Status.CHECK);
        Player p = getNextPlayer(status, getActivePlayer());
        System.out.println("Prochain joueur: " + p.getUser().getPseudo().getValue());
        if(action == Action.CHECK) {
            return p.getStatus() == Status.INGAME ? 0 : 1;
        }
        if(p.getLastBet() == this.lastBet && p.getStatus() != Status.INGAME) {
            return 1;
        }
        this.activePlayer = p;
        return 0;
    }

    /**
     * Vérifie si tous les joueurs encore en course dans la main sont en All-in
     * @return true si tous les joueurs sont en All-In, false si ce n'est pas le cas
     */

    public boolean areAllPlayersAllIn() {
        for(Player player: this.players) {
            Status status = player.getStatus();
            if(status != Status.ELIMINATED &&
               status != Status.FOLD) {
                if(status != Status.ALLIN) return false;
            }
        }
        return true;
    }

    /**
     * Passe au tour suivant, sinon appelle le module qui déterminera le vainqueur
     */

    public void updateTurn() {
        ArrayList<Status> validStatus = new ArrayList<Status>();
        validStatus.add(Status.BET);
        validStatus.add(Status.CHECK);
        validStatus.add(Status.ALLIN);
        switch(this.currentTurn) {
            case TURN:
                //TODO CheckWhoWins(): ArrayList<Player>
                System.out.println("Fin de la main !");
                break;
            case RIVER:
                this.currentTurn = Turn.TURN;
                dropCardsOnBoard(1);
                break;
            case FLOP:
                this.currentTurn = Turn.RIVER;
                dropCardsOnBoard(1);
                break;
            case PREFLOP:
                this.currentTurn = Turn.FLOP;
                dropCardsOnBoard(3);
                break;
        }
        for(Player player: players) {
            Status status = player.getStatus();
            if(validStatus.contains(status)) {
                player.setStatus(Status.INGAME);
                player.setLastBet(0);
            }
        }
        validStatus.clear();
        validStatus.add(Status.INGAME);
        setActivePlayer(getNextPlayer(validStatus, getDealer()));
        setLastBet(0);
    }

    /**
     * Détermine le nombre de joueurs encore en course dans la maina actuelle
     * @return le nombre de joueurs encore actifs dans la main
     */

    public int getInGamePlayers() {
        int sum = 0;
        for(Player player: players) {
            Status status = player.getStatus();
            if(status == Status.ALLIN ||
               status == Status.BET ||
               status == Status.CHECK ||
               status == Status.INGAME) {
                sum++;
            }
        }
        return sum;
    }

    /**
     * Distribue les cartes à chaque joueur
     */

    public void distributeHands() {
        for(Player player: this.players) {
            player.getHand()[0] = this.deck.drawCard();
            player.getHand()[1] = this.deck.drawCard();
        }
    }

    /**
     * Vérification de la mise
     * @param betValue
     * @return un éventuel message d'erreur
     */

    public Optional<String> checkBet(int betValue) {
        if(betValue < getBigBlind() && getLastBet() > getBigBlind()) {
            return Optional.of("La mise obligatoire est de "
                              + getBigBlind()
                              + " jetons.");
        }
        if(betValue > getActivePlayer().getStack()) {
            return Optional.of("Vous ne pouvez pas miser autant de jetons");
        }
        if(betValue + getActivePlayer().getLastBet() < getLastBet()) {
            return Optional.of("Il vous faut miser au moins le montant de la dernière mise," +
                               " soit " + (getLastBet() - getActivePlayer().getLastBet())  + " jetons !");
        }
        return Optional.empty();
    }

    /**
     * Vérification de la validité de l'action Parole
     * @return un éventuel message d'erreur
     */

    public Optional<String> checkCheck() {
        if(getLastBet() != 0 && getActivePlayer().getLastBet() != getLastBet()) {
            return Optional.of("Vous ne pouvez pas faire parole, une mise a déjà été faite");
        }
        return Optional.empty();
    }

    /**
     * Fait miser les blindes aux différents joueurs
     */

    public void betBlinds() {
//        int index = (players.indexOf(dealer) + 1) % players.size();
        ArrayList<Status> status = new ArrayList<Status>();
        status.add(Status.INGAME);
        Player player = getNextPlayer(status, getDealer());
        setActivePlayer(player);
        if(player.getStack() <= getSmallBlind()) {
            bet(player.getStack());
        } else {
            bet(getSmallBlind());
        }
        if(getActivePlayer().getStatus() != Status.ALLIN) getActivePlayer().setStatus(Status.INGAME);
        player = getNextPlayer(status, player);
        setActivePlayer(player);
        if(player.getStack() <= getBigBlind()) {
            bet(player.getStack());
        } else {
            bet(getBigBlind());
        }
        if(getActivePlayer().getStatus() != Status.ALLIN) getActivePlayer().setStatus(Status.INGAME);
        setActivePlayer(getNextPlayer(status, player));
    }

    /**
     *
     * @param status
     * @param currentPlayer
     * @return le prochain joueur qui a un status compris dans ceux passés en paramètre
     */

    public Player getNextPlayer(ArrayList<Status> status, Player currentPlayer) {
        int index = (players.indexOf(currentPlayer) + 1) % players.size();
        Player player = players.get(index);
        while(!status.contains(player.getStatus())) {
            index = (index + 1) % players.size();
            player = players.get(index);
        }
        return player;
    }

    public void dropCardsOnBoard(int nbCards) {
        for(int i = 0; i < nbCards; i++) {
            getBoard().add(this.deck.drawCard());
        }
    }
}
