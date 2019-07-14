package core.enums;

public enum Difficulty {
    EASY("Facile"),
    MEDIUM("Moyen"),
    HARD("Difficile");

    String name = "";

    Difficulty(String d) {
        name = d;
    }

    public String toString() {
        return name;
    }
}
