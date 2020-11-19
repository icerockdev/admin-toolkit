/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { useFeature } from '../../../../../../utils/hooks';
import { FeatureListTheadItem } from '../FeatureListTheadItem';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FeatureListEmptyRows } from '../FeatureListEmptyRows';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import { FeatureListRow } from '../FeatureListRow';
var FeatureListTable = observer(function () {
    var feature = useFeature();
    var _a = feature.data, isLoading = _a.isLoading, list = _a.list, rows = feature.filters.rows;
    return (React.createElement(TableContainer, { component: Paper, className: styles.container, elevation: 0 },
        React.createElement(Table, { className: classNames(styles.table, 'feature-list__table'), stickyHeader: true, size: "medium" },
            React.createElement(TableHead, null,
                React.createElement(TableRow, { className: "feature-list__table-head-row" }, feature.fieldsOfCurrentMode.map(function (field) { return (React.createElement(FeatureListTheadItem, { field: field, key: field.name.toString() })); }))),
            React.createElement(TableBody, null,
                isLoading && (React.createElement(FeatureListEmptyRows, { rows: rows, cols: feature.fieldsOfCurrentMode.length })),
                !isLoading &&
                    !!list &&
                    list.map(function (item, i) { return (React.createElement(FeatureListRow, { values: item, key: item.id + "-" + i })); })))));
});
export { FeatureListTable };
