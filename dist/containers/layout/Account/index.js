/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState, useRef, useMemo } from 'react';
import { IconButton, withStyles, Menu, MenuItem, Typography, } from '@material-ui/core';
import styles from './styles';
import { Link } from 'react-router-dom';
var AccountUnstyled = function (_a) {
    var classes = _a.classes, email = _a.email, username = _a.username, role = _a.role, onLogout = _a.onLogout;
    var ref = useRef(null);
    var _b = useState(false), isMenuOpen = _b[0], setIsMenuOpen = _b[1];
    var onMenuOpen = useCallback(function () { return setIsMenuOpen(true); }, [setIsMenuOpen]);
    var onMenuClose = useCallback(function () { return setIsMenuOpen(false); }, [setIsMenuOpen]);
    var name = useMemo(function () { return email || username || ''; }, [email, username]);
    return (React.createElement("div", { className: classes.account, ref: ref },
        React.createElement(IconButton, { "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", onClick: onMenuOpen, color: "inherit" },
            React.createElement("span", { className: classes.accountCircle }, (name && name.charAt(0)) || '')),
        React.createElement(Menu, { id: "menu-appbar", anchorEl: ref.current, keepMounted: true, open: isMenuOpen, onClose: onMenuClose },
            React.createElement(MenuItem, null,
                React.createElement("div", null,
                    name && React.createElement(Typography, { component: "div" }, name),
                    role && (React.createElement(Typography, { component: "span", variant: "caption", color: "textSecondary" }, role)))),
            React.createElement(MenuItem, { component: Link, onClick: onLogout, to: "/logout" },
                React.createElement(Typography, { component: "span", color: "primary" }, "\u0412\u044B\u0445\u043E\u0434 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430")))));
};
var Account = withStyles(styles)(AccountUnstyled);
export { Account };
