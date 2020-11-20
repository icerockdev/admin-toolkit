/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { useFeature } from '../../../../../../utils/hooks';
import { SortDir } from '../../../types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
var FeatureListTheadItem = observer(function (_a) {
    var _b;
    var field = _a.field;
    var feature = useFeature();
    var sortable = (_b = field.options.features) === null || _b === void 0 ? void 0 : _b.sort;
    var onSortChange = useCallback(function () {
        var _a = feature.filters, sortDir = _a.sortDir, sortBy = _a.sortBy;
        if (sortBy === field.name) {
            feature.filters.sortDir =
                sortDir === SortDir.ASC ? SortDir.DESC : undefined;
            if (sortDir === SortDir.DESC) {
                feature.filters.sortBy = undefined;
            }
            return;
        }
        feature.filters.sortDir = SortDir.ASC;
        feature.filters.sortBy = field.name.toString();
    }, [feature.filters, field]);
    var _c = feature.filters, sortDir = _c.sortDir, sortBy = _c.sortBy;
    return (React.createElement(TableCell, { className: classNames('feature-list__table-head-field', "feature-list__table-head-field_" + field.name, styles.thead) },
        React.createElement("div", { className: styles.label }, sortable ? (React.createElement(TableSortLabel, { active: sortBy === field.name, direction: sortDir, onClick: onSortChange },
            React.createElement(field.ListHead, null))) : (React.createElement(field.ListHead, null)))));
});
export { FeatureListTheadItem };
