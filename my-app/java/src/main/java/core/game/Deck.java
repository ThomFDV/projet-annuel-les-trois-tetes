package core.game;

import core.enums.Color;
import core.enums.Value;

import java.util.ArrayList;
import java.util.Random;

public class Deck {
    private ArrayList<Card> decklist;
    private int counter;

    public Deck() {
        this.decklist = new ArrayList<Card>();
        for(Value v: Value.values()) {
            for(Color c: Color.values()) {
                this.decklist.add(new Card(v, c));
            }
        }
        this.counter = 0;
    }

    public void shuffleDeck() {
        Random rand = new Random();
        for(int i = this.decklist.size() - 1; i > 0; i--) {
            int newPosition = rand.nextInt(i + 1);
            Card temp = decklist.get(newPosition);
            decklist.set(newPosition, decklist.get(i));
            decklist.set(i, temp);
        }
        this.counter = 0;
    }

    public Card drawCard() {
        return decklist.get(this.counter++);
    }

    public ArrayList<Card> getDecklist() {
        return this.decklist;
    }
}
