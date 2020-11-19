/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '../../common/Placeholder';
var FeatureReadField = function (_a) {
    var label = _a.label, disabled = _a.disabled, hideLabel = _a.hideLabel, children = _a.children;
    return (React.createElement("div", { className: classNames(styles.field, 'feature-read__field') },
        !hideLabel && (React.createElement("div", { className: classNames(styles.label, 'feature-read__field-label') }, label)),
        React.createElement(Placeholder, { width: "56px", isLoading: disabled },
            React.createElement("div", { className: classNames(styles.value, 'feature-read__field-value') }, children))));
};
export { FeatureReadField };
