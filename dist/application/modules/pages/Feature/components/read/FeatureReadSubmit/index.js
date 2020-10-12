import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import { useFeature } from '../../../../../../utils/hooks';
import { FeatureMode } from '../../../types';
var FeatureReadSubmit = observer(function () {
    var feature = useFeature();
    if (!feature.isEditing)
        return React.createElement(Fragment, null);
    return (React.createElement("div", { className: classNames(styles.submit, 'feature-read__submit') },
        React.createElement(Button, { variant: "outlined", color: "default", onClick: feature.cancelEditing, type: "button" }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
        React.createElement(Button, { variant: "contained", color: "primary", type: "submit", disabled: feature.data.isLoading }, feature.mode === FeatureMode.create ? 'Создать' : 'Сохранить')));
});
export { FeatureReadSubmit };
