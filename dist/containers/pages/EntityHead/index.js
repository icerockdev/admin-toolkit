/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import styles from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { Filter } from '../../../components/pages/Filter';
var EntityHeadUnstyled = function (_a) {
    var classes = _a.classes, title = _a.title, buttons = _a.buttons, filters = _a.filters, fields = _a.fields, canCreate = _a.canCreate, canExport = _a.canExport, url = _a.url, filterData = _a.filterData, setFilters = _a.setFilters, applyFilter = _a.applyFilter, withToken = _a.withToken, onExport = _a.onExport;
    var clearFilter = useCallback(function () {
        setFilters([]);
        applyFilter();
    }, [setFilters, filters, applyFilter]);
    return (React.createElement(Grid, { container: true, justify: "space-between", alignItems: "center", className: classes.header },
        title,
        filters && (React.createElement(Filter, { filterData: filterData, fields: fields, filters: filters, setFilters: setFilters, applyFilter: applyFilter, clearFilter: clearFilter, withToken: withToken })),
        buttons && React.createElement("div", { className: classes.buttons }, buttons),
        canExport && (React.createElement(Button, { variant: "outlined", color: "primary", onClick: onExport, className: classes.export }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442")),
        canCreate && url && (React.createElement(Button, { type: "button", variant: "contained", color: "primary", component: RouterLink, to: url + "/create" }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"))));
};
var EntityHead = withStyles(styles)(EntityHeadUnstyled);
export { EntityHead };
