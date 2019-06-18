package com.gmail.grigorij.ui.utils.css;

public enum Position {

    ABSOLUTE("absolute"), FIXED("fixed"), RELATIVE("relative");

    private String value;

    Position(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
