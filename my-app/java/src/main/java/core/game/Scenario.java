package core.game;

import core.enums.Action;
import core.enums.Difficulty;

import java.util.ArrayList;

public class Scenario {

    private String name;
    private Difficulty difficulty;
    private GameInstance scenarioController;
    private ArrayList<Moves> moves;
    private Action rightAnswer;
    private String explanation;
}
