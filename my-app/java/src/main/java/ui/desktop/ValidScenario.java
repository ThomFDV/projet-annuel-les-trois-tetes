package ui.desktop;

import core.csv.ScenarioWriter;
import core.enums.Action;
import core.game.GameInstance;
import core.scenario.ScenarioActions;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

import java.io.File;
import java.util.ArrayList;
import java.util.Optional;

public class ValidScenario {
    public Stage mainStage;
    public BorderPane mainContainer;
    public AnchorPane validScenarioContainer;
    public AnchorPane previousContainer;

    public GameInstance getGameInstance() {
        return gameInstance;
    }

    public void setGameInstance(GameInstance gameInstance) {
        this.gameInstance = gameInstance;
    }

    public String getFileName() {
        return this.fileName;
    }

    public ArrayList<ScenarioActions> getActions() {
        return actions;
    }

    public TextArea getSolutionArea() {
        return solutionArea;
    }

    public ChoiceBox<Action> getSolutionChoiceBox() {
        return solutionChoiceBox;
    }

    public void setMainStage(Stage mainStage) {
        this.mainStage = mainStage;
    }

    public void setMainContainer(BorderPane mainContainer) {
        this.mainContainer = mainContainer;
    }

    public void setValidScenarioContainer(AnchorPane validScenarioContainer) {
        this.validScenarioContainer = validScenarioContainer;
    }

    public void setPreviousContainer(AnchorPane previousContainer) {
        this.previousContainer = previousContainer;
    }

    public void setActions(ArrayList<ScenarioActions> actions) {
        this.actions = new ArrayList<ScenarioActions>(actions);
    }

    private ArrayList<ScenarioActions> actions;

    private GameInstance gameInstance;

    private String fileName;

    private String initialPathValue = "Veuillez sélectionner un chemin pour enregistrer votre scénario";

    @FXML
    private TextArea solutionArea;

    @FXML
    private ChoiceBox<Action> solutionChoiceBox;

    @FXML
    private Button saveButton;

    @FXML
    private Button returnButton;

    @FXML
    private Label fileNameLabel;

    @FXML
    private Label filePathLabel;

    @FXML
    private Label errorMessageLabel;

    @FXML
    public void onReturnButtonPressed() {
        this.mainContainer.setCenter(previousContainer);
    }

    @FXML
    public void onSaveButtonPressed() {
        Optional<String> errorMessage = this.checkInputs();
        if(errorMessage.isPresent()) {
            this.errorMessageLabel.setText(errorMessage.get());
            return;
        }
        errorMessage = ScenarioWriter.saveScenarioAsCSV(
                this.gameInstance,
                this.actions,
                this.fileName,
                this.filePathLabel.getText(),
                this.solutionArea.getText(),
                this.solutionChoiceBox.getSelectionModel().getSelectedItem()
        );
        if(errorMessage.isPresent()) {
            this.errorMessageLabel.setText(errorMessage.get());
            return;
        }
        System.out.println("Réussi !!!");
    }

    @FXML
    public void onBrowseButtonClicked() {
        DirectoryChooser directoryChooser = new DirectoryChooser();
        File dir = directoryChooser.showDialog(mainStage);
        if(dir != null) {
            this.filePathLabel.setText(dir.getAbsolutePath());
            this.errorMessageLabel.setText("");
        } else {
            this.filePathLabel.setText(this.initialPathValue);
        }
    }

    @FXML
    public void initialize() {
        for(Action action: Action.values()) {
            this.solutionChoiceBox.getItems().add(action);
        }
        this.solutionChoiceBox.getSelectionModel().selectFirst();
        this.filePathLabel.setText(this.initialPathValue);
        this.errorMessageLabel.setText("");
    }

    public void generateFileName() {
        this.fileName = this.gameInstance.getScenarioName().toLowerCase().replace(" ", "_") + ".csv";
        this.fileNameLabel.setText(this.fileName);
    }

    public Optional<String> checkInputs() {
        if(this.filePathLabel.getText() == this.initialPathValue) {
            return Optional.of("Veuillez sélectionner un dossier pour enregistrer votre scénario");
        }
        if(this.solutionArea.getText() == "") {
            return Optional.of("Veuillez saisir l'explication de la solution du scénario");
        }
        return Optional.empty();
    }
}
