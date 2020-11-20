/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { memo } from 'react';
import { Placeholder } from '../../common/Placeholder';
import { TableCell, TableRow } from '@material-ui/core';
var FeatureListEmptyRows = memo(function (_a) {
    var rows = _a.rows, cols = _a.cols;
    return (React.createElement(React.Fragment, null, __spreadArrays(new Array(rows)).map(function (_, i) { return (React.createElement(TableRow, { key: i }, __spreadArrays(new Array(cols)).map(function (_, j) { return (React.createElement(TableCell, { key: j },
        React.createElement(Placeholder, null))); }))); })));
});
export { FeatureListEmptyRows };
