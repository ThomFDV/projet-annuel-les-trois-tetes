package core.csv;

import core.enums.Action;
import core.game.GameInstance;
import core.game.Player;
import core.scenario.ScenarioActions;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Optional;

public class ScenarioWriter {

    public static Optional<String> saveScenarioAsCSV(GameInstance gameInstance, ArrayList<ScenarioActions> actions, String fileName, String filePath,
                                                     String explanations, Action solution) {
        String fileContent= new String();
        for(Player p: gameInstance.getPlayers()) {
            p.resetPlayer();
            fileContent += playerMapping(p);
        }
        fileContent += gameInformationsMapping(gameInstance, explanations, solution);
        fileContent += actionsMapping(actions);
        System.out.println(fileContent);
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(filePath + "\\" + fileName));
            bw.write(fileContent);
            bw.close();
        } catch(Exception e) {
            e.printStackTrace();
            return Optional.of("Echec de la création du fichier de scénario");
        }
        return Optional.empty();
    }

    public static String playerMapping(Player player) {
        String res = "Player;";
        res += player.getName() + ";";
        res += player.getStack() + ";";
        res += player.getHand()[0] + ";";
        res += player.getHand()[1] + ";\n";
        return res;
    }

    public static String gameInformationsMapping(GameInstance gameInstance, String explanation, Action solution) {
        String res = "ScenarioName;" + gameInstance.getScenarioName() + ";\n";
        res += "Difficulty;" + gameInstance.getDifficulty().toString() + ";\n";
        res += "Dealer;" + gameInstance.getDealer().getName() + ";\n";
        res += "EndTurn;" + gameInstance.getEndTurn().toString() + ";\n";
        res += "Solution;" + solution.toString() + ";\n";
        res += "Explanations;" + explanation + ";\n";
        return res;
    }

    public static String actionsMapping(ArrayList<ScenarioActions> actions) {
        String res = "";
        for(ScenarioActions action: actions) {
            res += "Action;" + action.getPlayerName() + ";" +
                    action.getAction().toString() + ";" +
                    action.getValue() + ";\n";
        }
        return res;
    }

}
