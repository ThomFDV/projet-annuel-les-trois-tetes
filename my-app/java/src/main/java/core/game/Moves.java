package core.game;

import core.enums.Action;

public class Moves {
    private String name;
    private Action action;
    private int value;

    /**
     * Constructeur pour les coups ayant une valeur de mise
     * @param name
     * @param action
     * @param value
     */
    public Moves(String name, Action action, int value) {
        this.name = name;
        this.action = action;
        this.value = value;
    }

    /**
     * Constructeur pour les coups n'ayant pas de valeur de mise
     * @param name
     * @param action
     */
    public Moves(String name, Action action) {
        this.name = name;
        this.action = action;
        this.value = 0;
    }
}
