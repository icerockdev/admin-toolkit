/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useFeature } from '../../../../../../utils/hooks';
import { observer } from 'mobx-react';
var FeatureListPagination = observer(function () {
    var t = useTranslation().t;
    var feature = useFeature();
    var _a = feature.filters, rows = _a.rows, page = _a.page, count = _a.count, rowsSelectOptions = _a.rowsSelectOptions;
    var labelDisplayedRows = useCallback(function (_a) {
        var from = _a.from, to = _a.to, count = _a.count;
        var pageNum = page + 1;
        var pageCount = Math.ceil(count / rows);
        return t('messages:Page {{pageNum}} of {{pageCount}}, Results {{from}}-{{to}} of {{count}}', {
            pageNum: pageNum,
            pageCount: pageCount,
            from: from,
            to: to,
            count: count,
        });
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
        React.createElement(TablePagination, { rowsPerPageOptions: rowsSelectOptions, component: "div", count: count, labelRowsPerPage: t('common:Per page') + ":", rowsPerPage: rows, page: page, onChangePage: onPageChange, onChangeRowsPerPage: onRowsChange, labelDisplayedRows: labelDisplayedRows })));
});
export { FeatureListPagination };
