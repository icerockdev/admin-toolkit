/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import styles from './styles.module.scss';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';
var FilterWrapper = function (_a) {
    var onClear = _a.onClear, children = _a.children, inline = _a.inline;
    return (React.createElement("div", { className: classNames(styles.filter, 'feature-filter-wrapper') },
        React.createElement("div", { className: classNames(styles.input, 'feature-filter-wrapper__input') }, children),
        !inline && (React.createElement("div", { className: classNames(styles.close, 'feature-filter-wrapper__close'), onClick: onClear },
            React.createElement(Close, null)))));
};
export { FilterWrapper };
