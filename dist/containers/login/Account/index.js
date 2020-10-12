/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { useConfig } from '../../../application/utils/hooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
var Account = function () {
    var _a, _b;
    var ref = useRef(null);
    var config = useConfig();
    var onLogout = useCallback(function () {
        var _a;
        if (!window.confirm('Вы действительно хотите выйте?'))
            return;
        (_a = config.auth) === null || _a === void 0 ? void 0 : _a.logout();
    }, [config.auth]);
    return (React.createElement("div", { className: styles.account, ref: ref },
        React.createElement("div", { className: styles.left },
            React.createElement("div", { className: styles.name }, (_a = config.auth) === null || _a === void 0 ? void 0 : _a.userName),
            React.createElement("div", { className: styles.role }, (_b = config.auth) === null || _b === void 0 ? void 0 : _b.userRoleTitle)),
        React.createElement("div", { className: styles.logout, onClick: onLogout },
            React.createElement(ExitToAppIcon, null))));
};
export { Account };
