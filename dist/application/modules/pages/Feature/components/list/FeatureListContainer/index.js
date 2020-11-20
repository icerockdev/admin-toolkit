/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
var FeatureListContainer = function (_a) {
    var Title = _a.title, Buttons = _a.buttons, Filters = _a.filters, Pagination = _a.pagination, children = _a.children;
    return (React.createElement("div", { className: classNames(styles.grid, 'feature-list__container-grid') },
        React.createElement("div", { className: classNames(styles.head, 'feature-list__container-head') },
            React.createElement("div", { className: classNames(styles.title, 'feature-list__title') },
                React.createElement(Title, null)),
            React.createElement("div", { className: classNames(styles.filters, 'feature-list__filters') },
                React.createElement(Filters, null)),
            React.createElement("div", { className: classNames(styles.buttons, 'feature-list__buttons') },
                React.createElement(Buttons, null))),
        React.createElement("div", { className: classNames(styles.content, 'feature-list__container-content') }, children),
        React.createElement("div", { className: classNames(styles.pagination, 'feature-list__container-pagination') },
            React.createElement(Pagination, null))));
};
export { FeatureListContainer };
