package ui.desktop;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

public class CardImageView extends ImageView {
    public CardImageView(String path) {
        super(path);
        this.setFitHeight(80);
        this.setFitWidth(60);
    }

    public void setImage(String url) {
        try {
            this.setImage(new Image(String.valueOf(getClass().getClassLoader().getResource(url))));
        } catch(Exception e) {
            e.printStackTrace();
        }

    }
}
