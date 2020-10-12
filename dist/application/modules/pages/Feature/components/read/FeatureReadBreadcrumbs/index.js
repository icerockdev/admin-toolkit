import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { Breadcrumbs, Link } from '@material-ui/core';
import classNames from 'classnames';
import { useFeature } from '../../../../../../utils/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Placeholder } from '../../common/Placeholder';
import { FeatureMode } from '../../../types';
import { useRouteMatch } from 'react-router';
var FeatureReadBreadcrumbs = observer(function () {
    var feature = useFeature();
    var title = useMemo(function () { return feature.getItemTitle(feature.data.read); }, [
        feature.data.read,
    ]);
    var mode = useMemo(function () {
        switch (feature.mode) {
            case FeatureMode.update:
                return 'Редактирование';
            case FeatureMode.create:
                return 'Создание';
            default:
                return null;
        }
    }, [feature.mode]);
    var match = useRouteMatch();
    var id = match.params.id;
    return (React.createElement(Breadcrumbs, { separator: "\u203A", "aria-label": "breadcrumb", className: classNames(styles.breadcrumbs, 'feature-read__breadcrumbs') },
        React.createElement(Link, { to: feature.filters.queryString, component: RouterLink, className: styles.entity },
            React.createElement("b", null, feature.title)),
        feature.mode !== FeatureMode.create && (React.createElement(Placeholder, { width: "120px", isLoading: feature.data.isLoading },
            React.createElement("div", { className: styles.current }, !!mode ? (React.createElement(Link, { to: feature.url + "/" + id, component: RouterLink }, title)) : (title)))),
        !!mode && React.createElement("div", { className: styles.mode }, mode)));
});
export { FeatureReadBreadcrumbs };
