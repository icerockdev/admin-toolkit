/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { createMuiTheme } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { Notifications } from '../Notification';
var Config = /** @class */ (function () {
    function Config(fields) {
        var _this = this;
        this.name = '';
        this.pages = [];
        this.theme = createMuiTheme({});
        this.history = createBrowserHistory();
        this.notifications = new Notifications();
        if (fields) {
            Object.assign(this, fields);
        }
        if (this.pages.length) {
            this.pages.forEach(function (page) {
                page.parent = _this;
            });
        }
        if (this.auth) {
            this.auth.parent = this;
        }
    }
    return Config;
}());
export { Config };
