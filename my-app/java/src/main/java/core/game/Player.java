package core.game;

import core.User;
import core.enums.Status;

public class Player {
    private User user;
    private int stack;
    private Status status;
    private Card[] hand;
    private int lastBet;
    private int personnalPot;

    public int getStack() { return this.stack; }

    public int getPersonnalPot() {
        return this.personnalPot;
    }

    public void setStatus(Status status) { this.status = status; }

    public Status getStatus() { return this.status; }

    public Card[] getHand() { return this.hand; }

    public void setHand(Card[] newHand) {this.hand = newHand;}

    public int getLastBet() {
        return this.lastBet;
    }

    public User getUser() {
        return this.user;
    }

    public void setLastBet(int lastBetValue) {
        this.lastBet = lastBetValue;
    }

    public void addToLastBet(int lastBetValue){
        this.lastBet += lastBetValue;
    }

    public void setPersonnalPot(int value) {
        this.personnalPot = value;
    }

    public void addToPersonnalPot(int value) {
        this.personnalPot += value;
    }

    public void subtractFromStack(int value) {
        this.stack -= value;
    }

    public Player(User u, int initialStack, Status s) {
        this.user = u;
        this.stack = initialStack;
        this.status = s;
        this.lastBet = 0;
        this.personnalPot = 0;
        this.hand = new Card[2];
    }
}
