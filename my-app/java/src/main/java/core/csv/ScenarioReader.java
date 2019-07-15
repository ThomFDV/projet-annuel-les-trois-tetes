package core.csv;

import core.enums.Action;
import core.enums.Difficulty;
import core.game.Card;
import core.game.GameInstance;
import core.game.Player;
import core.scenario.ScenarioActions;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Optional;

public class ScenarioReader {

    private GameInstance gameInstance = null;
    private ArrayList<ScenarioActions> scenarioActions;

    public Optional<String> createScenarioInstance(String filePath) {
        Optional<String> errorMessage;
        ArrayList<Player> players = new ArrayList<Player>();
        this.scenarioActions = new ArrayList<ScenarioActions>();
        String dealer;
        String scenarioName;
        String explanations;
        Action solution = null;
        try {
            BufferedReader reader = new BufferedReader(new FileReader(new File(filePath)));
            String line;
            while((line = reader.readLine()) != null) {
                String[] content = line.split(";");
                switch(content[0]) {
                    case "Joueur":
                        try {
                            players.add(new Player(
                               content[1],
                               Integer.valueOf(content[2]),
                               new Card(content[3]),
                               new Card(content[4])
                            ));
                        } catch(Exception e) {
                            e.printStackTrace();
                            return Optional.of("Erreur : le fichier du scenario a été modifié pour un joueur");
                        }
                        break;
                    case "Action":
                        try {
                            this.scenarioActions.add(new ScenarioActions(
                               content[1],
                               Action.valueOf(content[2]),
                               Integer.valueOf(content[3])
                            ));
                        } catch(Exception e) {
                            e.printStackTrace();
                            return Optional.of("Erreur : le fichier du scenario a été modifié pour une action");
                        }
                        break;
                    case "Dealer":
                        dealer = content[1];
                        break;
                    case "ScenarioName":
                        scenarioName = content[1];
                        break;
                    case "Explanation":
                        explanations = content[1];
                        break;
                    case "Solution":
                        solution = Action.valueOf(content[1]);
                        break;
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
            return Optional.of("Une erreur est survenue lors de la lecture du fichier");
        }
        return Optional.empty();
    }

    public Optional<String> checkReadInformations(ArrayList<Player> players,
                                                  String dealer,
                                                  String scenarioName,
                                                  String explanations,
                                                  Action solution) {
        for(Player player: players) {
            if(!isNameCorrect(player.getName())) {
                return Optional.of("Erreur: un nom de joueur a été modifié");
            }
        }
        if(dealer.isEmpty()) {
            return Optional.of("Erreur: le dealer n'est pas déclaré");
        }
        if(scenarioName.isEmpty()) {
            return Optional.of("Erreur: le nom du scénairo n'est pas déclaré");
        }
        if(explanations.isEmpty()) {
            return Optional.of("Erreur: les explications ne sont pas fournies");
        }
        if(solution == null) {
            return Optional.of("Erreur: la solution n'est pas déclarée");
        }
        return Optional.empty();
    }

    public boolean isNameCorrect(String name) {
        if(name == "Vous") return true;
        if(!name.startsWith("Joueur")) return false;
        String[] splitName = name.split(" ");
        if(splitName.length != 2) return false;
        try {
            int temp = Integer.valueOf(splitName[1]);
        } catch(Exception e) {
            return false;
        }
        return true;
    }
}
