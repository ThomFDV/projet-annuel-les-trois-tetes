package core.game;

import core.enums.Color;
import core.enums.Value;

public class Card {
    private Value value;
    private Color color;

    public Card(Value v, Color c) {
        this.value = v;
        this.color = c;
    }

    public Card(String card) {
        String[] splittedCard = card.split(" de ");
        this.value = Value.valueOf(splittedCard[0]);
        this.color = Color.valueOf(splittedCard[1]);
    }

    public Color getColor() {
        return this.color;
    }

    public Value getValue() {
        return this.value;
    }

    public String getImgPath() {
        String path = "";
        path += Integer.toString(this.value.getVal());
        switch (this.color) {
            case CLUBS:
                path += "c";
                break;
            case HEART:
                path += "h";
                break;
            case SPADES:
                path += "s";
                break;
            case DIAMOND:
                path += "d";
                break;
        }
        return "ui/desktop/img/cards/" + path + ".png";
    }

    public String toString() {
        return this.value.toString() + " de " + this.color.toString();
    }

    /**
     * On réécrit equals pour le contains() dans l'initialisation des decks
     * @param obj
     * @return si les deux objets ont la même valeur ou non
     */

    @Override
    public boolean equals(Object obj) {
        if(obj == null) return false;
        if(this == obj) {
            return true;
        }
        if(getClass() != obj.getClass()) {
            return false;
        }
        Card c = (Card) obj;
        if(value != c.getValue()) {
            return false;
        }
        if(color != c.getColor()) {
            return false;
        }
        return true;
    }
}
