package com.dz.example;

/**
 * Created by toshiba on 15/4/23.
 */

class Sub {
    final String subName = "Hello World";
    final double pi = 3.14;
}
public class TextConstant {
    int number = 0;
    public void run(Object obj) {
        System.out.println("是对象bject:" + obj);
    }

    public void run(Sub sub) {
        System.out.println("是类sub:" + sub);
    }

    public void showObject() {
        Sub sub = new Sub();
        System.out.println("Sub.subName==" + sub.subName);
        System.out.println("Sub.fpi==" + sub.pi);
    }

    public static void main(String[] args) {
        TextConstant constant = new TextConstant();

        constant.number = 5;
        System.out.println("t.i " + constant.number);
        constant.showObject();
        constant.run(null);
    }
}
