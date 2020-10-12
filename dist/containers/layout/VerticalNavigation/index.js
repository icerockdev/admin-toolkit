import React from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '../../../application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
var VerticalNavigation = observer(function () {
    var config = useConfig();
    return (React.createElement("div", { className: classNames(styles.navigation, 'vertical-navigation') }, config.linksForCurrentUser.map(function (link) { return (React.createElement(NavLink, { to: link.url, className: classNames(styles.link, 'vertical-navigation__link'), key: link.url }, link.name)); })));
});
export { VerticalNavigation };
