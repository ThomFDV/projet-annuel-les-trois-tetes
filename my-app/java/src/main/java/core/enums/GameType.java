package core.enums;

/**
 * Type de partie
 * Sert à déterminer la vitesse et la fréquence d'augmentation des blindes
 */

public enum GameType {
    QUICK ("Rapide"),
    CLASSIC ("Classique");

    String value;

    GameType(String v) {
        value = v;
    }

    @Override
    public String toString() {
        return value;
    }
}
