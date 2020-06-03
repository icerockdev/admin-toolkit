/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TablePagination, withStyles } from '@material-ui/core';
import styles from './styles';
var EntityFooterUnconnected = function (_a) {
    var classes = _a.classes, totalCount = _a.totalCount, page = _a.page, itemsPerPage = _a.itemsPerPage, items = _a.items, setPage = _a.setPage, setPerPage = _a.setPerPage;
    var onChangeRowsPerPage = useCallback(function (event) { return setPerPage(parseInt(event.target.value)); }, [setPerPage]);
    var onChangePage = useCallback(function (_, newPage) { return setPage(newPage); }, [setPage]);
    return (React.createElement(TablePagination, { rowsPerPageOptions: itemsPerPage, component: "div", count: totalCount, labelRowsPerPage: "\u041D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:", rowsPerPage: items, page: page, onChangePage: onChangePage, onChangeRowsPerPage: onChangeRowsPerPage, className: classes.pager }));
};
var EntityFooter = withStyles(styles)(EntityFooterUnconnected);
export { EntityFooter };