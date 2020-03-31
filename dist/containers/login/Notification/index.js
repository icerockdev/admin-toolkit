/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
var Notification = function (_a) {
    var hideNotification = _a.hideNotification, show = _a.show, type = _a.type, message = _a.message, timeout = _a.timeout;
    var onClose = useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        hideNotification();
    }, [hideNotification]);
    return (React.createElement(Snackbar, { anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, key: "bottom,left", open: show, onClose: onClose, autoHideDuration: timeout },
        React.createElement(Alert, { elevation: 6, variant: "filled", onClose: onClose, severity: type || 'info' }, message)));
};
export { Notification };
