/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { ENTITY_SORT_DIRS } from '../..';
var EntityHeadSortable = function (_a) {
    var children = _a.children, field = _a.field, active = _a.active, onSortChange = _a.onSortChange, direction = _a.direction;
    var onClick = useCallback(function () { return onSortChange(field); }, [field, onSortChange]);
    return (React.createElement(TableCell, null,
        React.createElement(TableSortLabel, { active: active, direction: active ? direction : ENTITY_SORT_DIRS.DESC, onClick: onClick }, children)));
};
export { EntityHeadSortable };
