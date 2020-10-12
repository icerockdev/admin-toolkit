import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '../../../../../../utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';
var FeatureListButtons = observer(function () {
    var feature = useFeature();
    var canBeCreated = feature.features.create && feature.api.availableApiFeatures.create;
    var canBeExported = feature.features.export && feature.api.availableApiFeatures.export;
    return (React.createElement("div", { className: classNames(styles.buttons, 'feature-list__buttons') },
        canBeExported && (React.createElement(Button, { variant: "outlined", color: "primary" },
            React.createElement(ImportExport, null))),
        canBeCreated && (React.createElement(Button, { variant: "contained", color: "primary", type: "button", onClick: feature.goToCreate },
            React.createElement(NoteAdd, null)))));
});
export { FeatureListButtons };
