/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useFeature } from '../../../../../../utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FeatureReadField } from '../FeatureReadField';
import { FeatureMode } from '../../../types';
import { hasPath } from 'ramda';
var FeatureReadContent = observer(function (_a) {
    var onlyFields = _a.onlyFields;
    var feature = useFeature();
    var fields = useMemo(function () {
        return onlyFields
            ? feature.fieldsOfCurrentMode.filter(function (field) {
                return onlyFields.includes(field.name);
            })
            : feature.fieldsOfCurrentMode;
    }, [feature.fieldsOfCurrentMode, onlyFields]);
    var values = useMemo(function () { return feature.data.read; }, [feature.data.read]);
    var component = useCallback(function (field) {
        switch (feature.mode) {
            case FeatureMode.create:
                return field.Create;
            case FeatureMode.update:
                return field.Update;
            default:
                return field.Read;
        }
    }, [feature.mode]);
    var isEditing = feature.mode === FeatureMode.create || feature.mode === FeatureMode.update;
    return (React.createElement("div", { className: classNames(styles.content, 'feature-read__content') }, fields.map(function (field) { return (React.createElement(FeatureReadField, { label: field.label, key: field.key, hideLabel: isEditing, disabled: feature.mode === FeatureMode.read &&
            !hasPath(field.fieldPath, values) }, component(field))); })));
});
export { FeatureReadContent };
