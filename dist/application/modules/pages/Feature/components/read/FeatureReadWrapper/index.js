/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '../../../../../../utils/hooks';
var FeatureReadWrapper = function (_a) {
    var children = _a.children;
    var feature = useFeature();
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        if (!feature.isEditing)
            return;
        feature.controller.submitItem();
    }, [feature]);
    return (React.createElement("form", { className: classNames(styles.wrap, 'feature-read__wrapper'), onSubmit: onSubmit }, children));
};
export { FeatureReadWrapper };
