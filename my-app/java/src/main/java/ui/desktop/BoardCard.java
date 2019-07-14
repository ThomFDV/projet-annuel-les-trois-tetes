package ui.desktop;

import core.game.Card;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.geometry.Pos;
import javafx.scene.control.ChoiceBox;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.VBox;

public class BoardCard extends VBox {
    private ChoiceBox<Card> cardChoiceBox;
    private CardImageView cardImageView;

    public BoardCard(ChoiceBox<Card> cardChoiceBox) {
        super();
        this.cardChoiceBox = cardChoiceBox;
        this.cardChoiceBox.getSelectionModel().selectFirst();
        this.cardChoiceBox.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<Card>() {
            @Override
            public void changed(ObservableValue<? extends Card> observableValue, Card card, Card t1) {
                setNewImage(t1);
            }
        });
        this.cardImageView = new CardImageView(this.cardChoiceBox.getSelectionModel().getSelectedItem().getImgPath());
        this.getChildren().addAll(this.cardImageView, this.cardChoiceBox);
        this.setAlignment(Pos.BASELINE_CENTER);
    }

    public void setNewImage(Card card) {
        this.cardImageView.setImage(card.getImgPath());
    }

    public Card getChoiceBoxValue() {
        return this.cardChoiceBox.getSelectionModel().getSelectedItem();
    }
}
