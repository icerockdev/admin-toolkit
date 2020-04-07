/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { Typography, withStyles, Grid, Button, } from '@material-ui/core';
import styles from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { Filter } from '../../../components/pages/Filter';
var EntityHeadUnstyled = function (_a) {
    var classes = _a.classes, title = _a.title, filters = _a.filters, fields = _a.fields, canCreate = _a.canCreate, url = _a.url, setFilters = _a.setFilters, applyFilter = _a.applyFilter;
    var setFilterCurrent = useCallback(function (current) {
        // setFilters({ ...filters, current, value: null });
        if (current === '') {
            applyFilter();
        }
    }, [setFilters, applyFilter, filters]);
    var clearFilter = useCallback(function () {
        setFilters([]);
        applyFilter();
    }, [setFilters, filters, applyFilter]);
    return (React.createElement(Grid, { container: true, justify: "space-between", alignItems: "flex-end", className: classes.header },
        React.createElement(Typography, { component: "h3", className: classes.title }, title),
        filters && (React.createElement(Filter, { fields: fields, filters: filters, setFilters: setFilters, applyFilter: applyFilter, clearFilter: clearFilter })),
        canCreate && url && (React.createElement(Button, { type: "button", variant: "contained", color: "primary", component: RouterLink, to: url + "/create" }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"))));
};
var EntityHead = withStyles(styles)(EntityHeadUnstyled);
export { EntityHead };
