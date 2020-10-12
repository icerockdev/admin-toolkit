import React, { useCallback } from 'react';
import { useFeature } from '../../../../../../utils/hooks';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@material-ui/core';
import { FeatureMode } from '../../../types';
import { Delete, Edit } from '@material-ui/icons';
import { toJS } from 'mobx';
var FeatureReadButtons = observer(function () {
    var feature = useFeature();
    var canBeEdited = feature.mode === FeatureMode.read &&
        feature.api.availableApiFeatures.update;
    var canBeDeleted = feature.mode !== FeatureMode.create &&
        feature.api.availableApiFeatures.delete;
    var onDelete = useCallback(function () {
        if (!window.confirm('Действительно хотите удалить?'))
            return;
        feature.controller.delete();
    }, [feature.controller]);
    var onEdit = useCallback(function () {
        feature.goToUpdate(feature.controller.getIdFromUrl());
    }, [feature]);
    console.log(toJS(feature.api.availableApiFeatures));
    return (React.createElement("div", { className: classNames(styles.buttons, 'feature-read__buttons') },
        canBeDeleted && (React.createElement(Button, { variant: "outlined", color: "secondary", startIcon: React.createElement(Delete, null), type: "button", onClick: onDelete }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")),
        canBeEdited && (React.createElement(Button, { variant: "contained", color: "primary", type: "submit", onClick: onEdit, startIcon: React.createElement(Edit, null) }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"))));
});
export { FeatureReadButtons };
