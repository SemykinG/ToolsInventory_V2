package com.gmail.grigorij.ui.utils.components;

import static com.gmail.grigorij.ui.utils.css.badge.BadgeShape.PILL;

import java.util.StringJoiner;

import com.vaadin.flow.component.html.Span;
import com.gmail.grigorij.ui.utils.UIUtils;
import com.gmail.grigorij.ui.utils.css.badge.BadgeColor;
import com.gmail.grigorij.ui.utils.css.badge.BadgeShape;
import com.gmail.grigorij.ui.utils.css.badge.BadgeSize;

public class Badge extends Span {

    public Badge(String text) {
        this(text, BadgeColor.NORMAL);
    }

    public Badge(String text, BadgeColor color) {
        super(text);
        UIUtils.setTheme(color.getThemeName(), this);
    }

    public Badge(String text, BadgeColor color, BadgeSize size,
            BadgeShape shape) {
        super(text);
        StringJoiner joiner = new StringJoiner(" ");
        joiner.add(color.getThemeName());

        if (shape.equals(PILL)) {
            joiner.add(shape.getThemeName());
        }

        if (size.equals(BadgeSize.S)) {
            joiner.add(size.getThemeName());
        }
        UIUtils.setTheme(joiner.toString(), this);
    }

}
