package core.enums;

public enum Value {
    KING (13, "Roi"),
    QUEEN (12, "Reine"),
    JACK (11, "Valet"),
    TEN (10, "Dix"),
    NINE (9, "Neuf"),
    EIGHT (8, "Huit"),
    SEVEN (7, "Sept"),
    SIX (6, "Six"),
    FIVE (5, "Cinq"),
    FOUR (4, "Quatre"),
    THREE (3, "Trois"),
    TWO (2, "Deux"),
    ACE (1, "As");

    private int val = 0;
    private String name = "";

    Value(int val, String name){
        this.val = val;
        this.name = name;
    }

    public String toString(){
        return name;
    }
}
