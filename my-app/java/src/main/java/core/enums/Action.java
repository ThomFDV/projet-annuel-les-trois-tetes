package core.enums;

/**
 * Actions possibles pour un joueur
 */

public enum Action {
    BET("Miser"),
    CHECK("Parole"),
    FOLD("Passer"),
    CALL("Suivre");

    String value;

    Action(String v) {
        value = v;
    }

    @Override
    public String toString() {
        return value;
    }
}
