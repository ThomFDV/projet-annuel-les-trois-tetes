package core.enums;

/**
 * Etapes d'une main
 * Les différents tours de mise dans une main de poker
 * Sert à déterminer quand révéler les cartes, le nombre de cartes à révéler
 */

public enum Turn {
    PREFLOP("Preflop"),
    FLOP("Flop"),
    RIVER("River"),
    TURN("Turn");

    String value;

    Turn(String v) {
        value = v;
    }

    @Override
    public String toString() {
        return value;
    }
}
