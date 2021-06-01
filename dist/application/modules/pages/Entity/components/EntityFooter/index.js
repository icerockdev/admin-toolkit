/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TablePagination, withStyles } from '@material-ui/core';
import styles from './styles';
import { useTranslation } from "react-i18next";
var EntityFooterUnconnected = function (_a) {
    var classes = _a.classes, totalCount = _a.totalCount, page = _a.page, itemsPerPage = _a.itemsPerPage, items = _a.items, setPage = _a.setPage, setPerPage = _a.setPerPage;
    var t = useTranslation().t;
    var onChangeRowsPerPage = useCallback(function (event) { return setPerPage(parseInt(event.target.value)); }, [setPerPage]);
    var onChangePage = useCallback(function (_, newPage) { return setPage(newPage); }, [setPage]);
    var labelDisplayedRows = function (page, items) { return function (_a) {
        var from = _a.from, to = _a.to, count = _a.count;
        var pageNum = page + 1;
        var pageCount = Math.ceil(count / items);
        return t('Page {{pageNum}} of {{pageCount}}, Results {{from}}-{{to}} of {{count}}', {
            pageNum: pageNum,
            pageCount: pageCount,
            from: from,
            to: to,
            count: count
        });
    }; };
    return (React.createElement(TablePagination, { rowsPerPageOptions: itemsPerPage, component: "div", count: totalCount, labelRowsPerPage: "\u041D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:", rowsPerPage: items, page: page, onChangePage: onChangePage, onChangeRowsPerPage: onChangeRowsPerPage, className: classes.pager, labelDisplayedRows: labelDisplayedRows(page, items) }));
};
var EntityFooter = withStyles(styles)(EntityFooterUnconnected);
export { EntityFooter };
