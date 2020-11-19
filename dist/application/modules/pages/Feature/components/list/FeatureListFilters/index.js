/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { Fragment } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '../../../../../../utils/hooks';
var FeatureListFilters = observer(function () {
    var feature = useFeature();
    if (!feature.filters.fieldsList.length)
        return React.createElement(Fragment, null);
    return (React.createElement("div", { className: classNames(styles.fitlers, 'feature-list__filters') }, feature.filters.Filters));
});
export { FeatureListFilters };
