import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '../../../../../../utils/hooks';
import { FeatureMode } from '../../../types';
import { observer } from 'mobx-react';
var FeatureReadContainer = observer(function (_a) {
    var Title = _a.title, Buttons = _a.buttons, Breadcrumbs = _a.breadcrumbs, Submit = _a.submit, children = _a.children;
    var feature = useFeature();
    var isHeaderShown = feature.mode !== FeatureMode.create;
    return (React.createElement("div", { className: classNames(styles.wrap, 'feature-read__container-wrap') },
        React.createElement("div", { className: classNames(styles.breadcrumbs, 'feature-read__breadcrumbs') },
            React.createElement(Breadcrumbs, null)),
        React.createElement("div", { className: classNames(styles.container, 'feature-read__container') },
            isHeaderShown && (React.createElement("div", { className: classNames(styles.header, 'feature-read__header') },
                React.createElement("div", { className: classNames(styles.title, 'feature-read__title') },
                    React.createElement(Title, null)),
                React.createElement("div", { className: classNames(styles.buttons, 'feature-read__buttons') },
                    React.createElement(Buttons, null)))),
            React.createElement("div", { className: classNames(styles.content, 'feature-read__container-content') }, children),
            React.createElement("div", { className: classNames(styles.submit) },
                React.createElement(Submit, null)))));
});
export { FeatureReadContainer };
