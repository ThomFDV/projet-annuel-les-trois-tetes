package core.scenario;

/**
 * Cette classe sert à générer les choix pour le nombre de joueurs et
 * évite de travailler en utilisant du parsing de String 
 */

public class NumberPlayersChoice {

    private int numberPlayers;
    private String value;

    public NumberPlayersChoice(int numberPlayers) {
        this.numberPlayers = numberPlayers;
        this.value =  Integer.toString(numberPlayers) + " joueurs";
    }

    public int getNumberPlayers() {
        return this.numberPlayers;
    }

    public void setNumberPlayers(int numberPlayers) {
        this.numberPlayers = numberPlayers;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String toString() {
        return this.value;
    }
}
