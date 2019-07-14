package ui.desktop;

import com.sun.glass.ui.Application;
import core.User;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

import java.io.IOException;
import java.util.Optional;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isEmpty;

public class Connection {

    @FXML
    private TextField connectionId;

    @FXML
    private PasswordField connectionPassword;

    @FXML
    private Button connectionLoginButton;

    @FXML
    private Label invalidInfosLabel;

    private User user = null;

    public Stage mainStage;

    private Scene mainScene;

    private Main mainApp;

    /**
     * Génère la scène de connexion
     * @return Scene
     * @throws IOException
     */

    public Scene scene() {
        AnchorPane pane = null;
        try {
            pane = FXMLLoader.load(Connection.class.getClassLoader().getResource("ui/desktop/fxml/Connection.fxml"));
        } catch(IOException e) {
            e.printStackTrace();
        } catch(NullPointerException ne) {
            ne.printStackTrace();
        } finally {
            return pane == null ? null : new Scene(pane);
        }
    }

    /**
     * Fonction d'écoute du bouton de de connexion
     * @return void, mais affiche un message d'erreur si la vérification retourne null
     */

    @FXML
    public void onLoginButtonPressed() throws Exception {
        checkLoginInfos(connectionId.getText(), connectionPassword.getText());
        if(!isUserValid()) {
            this.invalidInfosLabel.setVisible(true);
            return;
        }
        loadHomePage();
    }

    /**
     * Vérifie les informations de connexion de l'utilisateur
     * @param id: String
     * @param pwd: String
     * @return un utilisateur si la connexion a réussi, sinon null
     * @// TODO: 12/05/2019 ajouter l'appel à l'API
     */

    public void checkLoginInfos(String id, String pwd) {
        if(isBlank(id) || isBlank(pwd) || isEmpty(id) || isEmpty(pwd)) {
            this.user = null;
            return;
        }
        this.user = new User("");
    }

    /**
     * Appelle le controller de la page d'accueil et lance l'initialisation de cette dernière
     */

    public void loadHomePage() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getClassLoader().getResource("ui/desktop/fxml/mainContainer.fxml"));
        BorderPane pane = (BorderPane) loader.load();
        Scene scene = new Scene(pane);
        GeneralMenu generalMenuController = loader.getController();
        generalMenuController.setMainStage(mainStage);
        generalMenuController.setContainer(pane);
        generalMenuController.setHomeContent();
        mainStage.setScene(scene);
        mainStage.setTitle("Les Trois Têtes - Accueil");
        mainStage.sizeToScene();
        mainStage.setMinHeight(720);
        mainStage.setMaxHeight(720);
        mainStage.setMinWidth(1280);
        mainStage.setMaxWidth(1280);
        mainStage.show();
    }

    /**
     * Vérifie l'authenticité de l'utilisateur
     * @return true si l'utilisateur est valide, false si il ne l'est pas
     * @TODO Vérification des champs saisis
     */

    public boolean isUserValid() {
        return this.user == null ? false : true;
    }

    public User getUser() {
        return this.user;
    }

    public Stage getStage() {
        return this.mainStage;
    }

    public void setMainScene(Scene scene) { this.mainScene = scene; }

    public Scene getMainScene() { return this.mainScene; }

    public void setMainApp(Main main) { this.mainApp = main;}

    public void setStage(Stage stage) { mainStage = stage; }
}
