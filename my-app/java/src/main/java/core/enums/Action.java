package core.enums;

/**
 * Actions possibles pour un joueur
 */

public enum Action {
    BET("Mise"),
    CHECK("Parole"),
    FOLD("Passe");

    String value;

    Action(String v) {
        value = v;
    }

    @Override
    public String toString() {
        return value;
    }
}
