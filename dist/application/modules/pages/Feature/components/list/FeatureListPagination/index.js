/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { Fragment, useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useFeature } from '../../../../../../utils/hooks';
import { observer } from 'mobx-react';
var FeatureListPagination = observer(function () {
    var feature = useFeature();
    var _a = feature.filters, rows = _a.rows, page = _a.page, count = _a.count, rowsSelectOptions = _a.rowsSelectOptions;
    var labelDisplayedRows = useCallback(function (_a) {
        var from = _a.from, to = _a.to, count = _a.count;
        var totalPages = Math.ceil(count / rows);
        return "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 " + (page + 1) + " \u0438\u0437 " + totalPages + ", \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B " + from + "-" + to + " \u0438\u0437 " + count;
    }, [page, count, rows]);
    var onRowsChange = useCallback(function (event) {
        feature.filters.rows = event.target.value;
    }, [feature.filters]);
    var onPageChange = useCallback(function (_, val) {
        feature.filters.page = val;
    }, [feature.filters]);
    if (count === 0)
        return React.createElement(Fragment, null);
    return (React.createElement("div", { className: classNames(styles.pagination, 'feature-list__pagination_pagination') },
        React.createElement(TablePagination, { rowsPerPageOptions: rowsSelectOptions, component: "div", count: count, labelRowsPerPage: "\u041D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:", rowsPerPage: rows, page: page, onChangePage: onPageChange, onChangeRowsPerPage: onRowsChange, labelDisplayedRows: labelDisplayedRows })));
});
export { FeatureListPagination };
