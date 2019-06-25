package ui.desktop;

import core.User;
import core.plugin.PluginController;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Optional;

public class Main extends Application {

    private Stage mainStage;
    private BorderPane mainContainer;

    /**
     * Appelle la première scene de l'application qui est la connexion
     * @param primaryStage
     * @throws Exception
     */

    public void start(Stage primaryStage) throws Exception {
        PluginController pc = new PluginController("C:\\Users\\Corentin\\Desktop\\ESGI\\Année 3-2\\Projet Annuel\\dev\\javaApp\\target\\classes");
        pc.loadClass("PluginTest");
        showConnectionStage(primaryStage);
    }

    public void showConnectionStage(Stage primaryStage) throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/Connection.fxml"));
        Scene scene = new Scene(loader.load());
        Connection connectionController = loader.getController();
        connectionController.setStage(primaryStage);
        primaryStage.setTitle("Les Trois Têtes - Connexion");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

    public Stage getStage() {
        return this.mainStage;
    }
}
