import core.plugin.PluginInterface;

public class PluginTest implements PluginInterface {
    @Override
    public void run() {
        System.out.println("test du plugin");
    }
}
