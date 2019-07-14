package core.scenario;

import core.enums.Action;

public class ScenarioActions {
    private String playerName;
    private Action action;
    private int value;

    public ScenarioActions(String name, Action action, int value) {
        this.playerName = name;
        this.action = action;
        this.value = value;
    }

    public ScenarioActions(String name, Action action) {
        this.playerName = name;
        this.action = action;
    }
}
