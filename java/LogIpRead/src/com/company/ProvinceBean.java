package com.company;

/**
 * Created by toshiba on 15/8/27.
 */
public class ProvinceBean {
    private int count;
    private int id;
    private String name;

    public ProvinceBean(int count, int id, String name) {
        this.name = name;
        this.count = count;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String toString() {
        return "id: " + this.id + "--count: " + this.count + "--name: " + this.name;
    }

}
