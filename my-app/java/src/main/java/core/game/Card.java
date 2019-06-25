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

    public Color getColor() {
        return this.color;
    }

    public Value getValue() {
        return this.value;
    }

    public String toString() {
        return this.value.toString() + " de " + this.color.toString();
    }
}
