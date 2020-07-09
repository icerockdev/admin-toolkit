/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useEffect, useRef } from 'react';
import { TablePagination, withStyles } from '@material-ui/core';
import styles from './styles';
var labelDisplayedRows = function (page, items) { return function (_a) {
    var from = _a.from, to = _a.to, count = _a.count;
    return "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 " + (page + 1) + " \u0438\u0437 " + Math.ceil(count / items) + ", \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B " + from + "-" + to + " \u0438\u0437 " + count;
}; };
var EntityFooterUnconnected = function (_a) {
    var classes = _a.classes, totalCount = _a.totalCount, page = _a.page, itemsPerPage = _a.itemsPerPage, items = _a.items, setPage = _a.setPage, setPerPage = _a.setPerPage;
    var wrapper = useRef(null);
    var floater = useRef(null);
    var onChangeRowsPerPage = useCallback(function (event) { return setPerPage(parseInt(event.target.value)); }, [setPerPage]);
    var onChangePage = useCallback(function (_, newPage) { return setPage(newPage); }, [setPage]);
    useEffect(function () {
        if (!wrapper.current || !floater.current)
            return;
        var height = floater.current.getBoundingClientRect().height;
        if (!height)
            return;
        wrapper.current.style.height = height + 20 + "px";
        floater.current.style.position = "fixed";
    }, [wrapper.current, floater.current]);
    return (React.createElement("div", { ref: wrapper },
        React.createElement("div", { ref: floater, className: classes.floater },
            React.createElement(TablePagination, { rowsPerPageOptions: itemsPerPage, component: "div", count: totalCount, labelRowsPerPage: "\u041D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:", rowsPerPage: items, page: page, onChangePage: onChangePage, onChangeRowsPerPage: onChangeRowsPerPage, className: classes.pager, labelDisplayedRows: labelDisplayedRows(page, items) }))));
};
var EntityFooter = withStyles(styles)(EntityFooterUnconnected);
export { EntityFooter };
