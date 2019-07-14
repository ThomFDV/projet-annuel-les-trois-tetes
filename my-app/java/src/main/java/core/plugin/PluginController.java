package core.plugin;

import java.io.File;
import java.lang.reflect.Constructor;
import java.net.URL;
import java.net.URLClassLoader;

public class PluginController {
    private URLClassLoader urlClassLoader;
    private String path;

    public PluginController(String folderPath) {
        this.path = folderPath;
        File folderUrlAbsolute = new File(this.path);
        try {
            URL[] urls = {
                    new URL("file:///" + folderUrlAbsolute.getAbsolutePath() + "/") // pas obligé le slash à la fin
            };
            this.urlClassLoader = new URLClassLoader(urls);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void loadClass(String name) {
        try {
            Class plugin = this.urlClassLoader.loadClass(name);
            Constructor constructor = plugin.getConstructor();
            PluginInterface newPlugin = (PluginInterface) constructor.newInstance();
            newPlugin.run();
            /*
            Object o = constructor.newInstance();
            plugin.getMethod("run").invoke(o);
             */
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
