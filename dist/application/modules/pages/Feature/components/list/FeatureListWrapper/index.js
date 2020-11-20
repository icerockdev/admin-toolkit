/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
var FeatureListWrapper = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: classNames(styles.wrap, 'feature-list__wrapper') }, children));
};
export { FeatureListWrapper };
