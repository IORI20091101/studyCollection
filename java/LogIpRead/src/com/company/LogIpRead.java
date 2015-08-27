package com.company;


import org.apache.commons.io.input.Tailer;
import org.apache.commons.io.input.TailerListener;
import org.apache.commons.io.input.TailerListenerAdapter;

import java.io.File;

public class LogIpRead {


    public static void main(String[] args) {

        File file = new File(args[0] +"");  // /Users/toshiba/Downloads/javaTail/settings.xml

        TailerListener listener = new MyTailerListener();

        Tailer tailer = new Tailer(file, listener, 500);

        Thread thread = new Thread(tailer);

        thread.start();

    }
}
