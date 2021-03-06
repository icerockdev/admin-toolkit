/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { useFeature } from '../../../../../../utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
var FeatureListTitle = observer(function () {
    var feature = useFeature();
    return (React.createElement("h1", { className: classNames(styles.title, 'feature-list__title') }, feature.title));
});
export { FeatureListTitle };
