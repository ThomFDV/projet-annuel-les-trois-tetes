package ui.desktop;

import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class RunScenario {
    public Stage mainStage;
    public BorderPane mainContainer;
    public AnchorPane runScenarioContainer;

    public void setStage(Stage mainStage) {
        this.mainStage = mainStage;
    }

    public void setMainContainer(BorderPane mainContainer) {
        this.mainContainer = mainContainer;
    }

    public void setRunScenarioContainer(AnchorPane pane) {
        this.runScenarioContainer = pane;
    }

    public RunScenario() {

    }
}
