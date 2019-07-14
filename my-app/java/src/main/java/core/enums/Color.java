package core.enums;

public enum Color {

    CLUBS ("Trèfle"),
    DIAMOND ("Carreau"),
    HEART ("Coeur"),
    SPADES ("Pique");

    private String name = "";

    Color(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }
}
