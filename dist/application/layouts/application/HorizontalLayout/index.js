import React from 'react';
import { observer } from 'mobx-react';
import { HorizontalNavigation } from '../../../../containers/layout/HorizontalNavigation';
import { useConfig } from '../../../utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
var HorizontalLayout = observer(function (_a) {
    var children = _a.children;
    var config = useConfig();
    return (React.createElement("div", { className: classNames(styles.layout, 'horizontal-layout') },
        React.createElement("div", { className: classNames(styles.navigation, 'horizontal-layout__navigation') },
            React.createElement(HorizontalNavigation, null)),
        React.createElement("div", { className: classNames(styles.wrapper, 'horizontal-layout__wrapper') }, children)));
});
export { HorizontalLayout };
