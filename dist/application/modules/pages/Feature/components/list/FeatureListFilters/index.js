import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '../../../../../../utils/hooks';
var FeatureListFilters = observer(function () {
    var feature = useFeature();
    return (React.createElement("div", { className: classNames(styles.fitlers, 'feature-list__filters') }, feature.filters.Filters));
});
export { FeatureListFilters };
