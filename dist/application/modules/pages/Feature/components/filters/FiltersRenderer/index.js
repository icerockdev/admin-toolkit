/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useCallback, useMemo } from 'react';
import { useFeature } from '../../../../../../utils/hooks';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FilterSelector } from '../FilterSelector';
var FiltersRenderer = observer(function () {
    var feature = useFeature();
    var filterable = useMemo(function () { return feature.fieldsList.filter(function (field) { var _a; return (_a = field.options.features) === null || _a === void 0 ? void 0 : _a.filter; }); }, [feature.fieldsList]);
    var selected = useMemo(function () {
        return filterable.filter(function (field) {
            return feature.filters.selected.includes(field.name);
        });
    }, [filterable, feature.filters.selected]);
    var onAdd = useCallback(function (name) {
        feature.filters.selected = __spreadArrays(feature.filters.selected, [name]);
    }, [feature.filters.selected]);
    return (React.createElement("div", { className: classNames(styles.filters, 'feature-list__filters') },
        React.createElement(FilterSelector, { fields: filterable, onSelect: onAdd, selected: feature.filters.selected }),
        selected.map(function (field, i) { return (React.createElement(field.Filter, { key: field.name })); })));
});
export { FiltersRenderer };
