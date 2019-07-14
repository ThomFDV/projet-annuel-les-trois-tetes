package core.enums;

public enum Status {
    ELIMINATED ("Eliminé"),
    FOLD ("Passé"),
    ALLIN ("Tapis"),
    CHECK ("Parole"),
    BET ("Misé"),
    INGAME ("En jeu");

    String value = "";

    Status(String v) {
        value = v;
    }

    public String toString() {
        return value;
    }
}
