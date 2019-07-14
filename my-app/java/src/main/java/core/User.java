package core;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class User {

    private StringProperty pseudo = new SimpleStringProperty();

    public User(String pseudo) {
        this.pseudo.set(pseudo);
    }

    public void setPseudo(String pseudo) {
        this.pseudo.set(pseudo);
    }

    public StringProperty getPseudo() {
        return this.pseudo;
    }
}
