package ui.desktop;

import javafx.scene.control.TextField;

public class TextFieldNumbersOnly extends TextField {

    public TextFieldNumbersOnly() {
        super();
        this.textProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.matches("\\d*")) {
                this.setText(newValue.replaceAll("[^\\d]", ""));
            }
        });
    }

    public TextFieldNumbersOnly(String s) {
        super(s);
        this.textProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.matches("\\d*")) {
                this.setText(newValue.replaceAll("[^\\d]", ""));
            }
        });
    }
}
