/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import styles from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { EntityFilter } from '../EntityFilter';
import { useTranslation } from "react-i18next";
var EntityHeadUnstyled = function (_a) {
    var classes = _a.classes, title = _a.title, buttons = _a.buttons, filters = _a.filters, fields = _a.fields, canCreate = _a.canCreate, canExport = _a.canExport, url = _a.url, filterData = _a.filterData, entity = _a.entity, setFilters = _a.setFilters, applyFilter = _a.applyFilter, withToken = _a.withToken, onExport = _a.onExport;
    var t = useTranslation().t;
    var clearFilter = useCallback(function () {
        setFilters([]);
        applyFilter();
    }, [setFilters, applyFilter]);
    return (React.createElement(Grid, { container: true, justify: "space-between", alignItems: "center", className: classes.header },
        title,
        filters && (React.createElement(EntityFilter, { filterData: filterData, fields: fields, filters: filters, setFilters: setFilters, applyFilter: applyFilter, clearFilter: clearFilter, withToken: withToken, entity: entity })),
        React.createElement("div", { className: classes.buttons },
            buttons,
            canExport && (React.createElement(Button, { variant: "outlined", color: "primary", onClick: onExport, className: classes.export }, t('buttons:Export'))),
            canCreate && url && (React.createElement(Button, { type: "button", variant: "contained", color: "primary", component: RouterLink, to: url + "/create" }, t('buttons:Create'))))));
};
var EntityHead = withStyles(styles)(EntityHeadUnstyled);
export { EntityHead };
