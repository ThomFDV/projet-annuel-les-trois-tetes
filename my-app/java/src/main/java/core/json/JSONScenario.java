package core.json;

import core.enums.Action;
import core.enums.Difficulty;
import core.game.Player;
import core.scenario.ScenarioActions;

import java.util.ArrayList;

public class JSONScenario {
    private ArrayList<Player> players;
    private ArrayList<ScenarioActions> scenarioActions;
    private Difficulty difficulty;
    private Action solution;
    private String explanation;

    public JSONScenario(ArrayList<Player> players, ArrayList<ScenarioActions> actions, Difficulty difficulty, Action solution, String explanation) {
        this.players = new ArrayList<Player>(players);
        this.scenarioActions = new ArrayList<ScenarioActions>(actions);
        this.difficulty = difficulty;
        this.solution = solution;
        this.explanation = explanation;
    }

    public void exportToJSON(String path) {

    }
}
