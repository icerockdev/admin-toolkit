/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Notification } from '../../../containers/login/Notification';
var Notifications = /** @class */ (function () {
    function Notifications() {
        var _this = this;
        this.notification = {
            show: false,
            message: '',
            type: 'info',
            timeout: 6000,
        };
        this.hideNotification = function () {
            _this.notification.show = false;
        };
        this.showError = function (message) {
            _this.notification.show = true;
            _this.notification.message = message;
            _this.notification.type = 'error';
        };
        this.showSuccess = function (message) {
            _this.notification.show = true;
            _this.notification.message = message;
            _this.notification.type = 'success';
        };
    }
    Object.defineProperty(Notifications.prototype, "Output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(Notification, { hideNotification: _this.hideNotification, message: _this.notification.message, type: _this.notification.type, timeout: _this.notification.timeout, show: _this.notification.show })); });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], Notifications.prototype, "notification", void 0);
    __decorate([
        action
    ], Notifications.prototype, "hideNotification", void 0);
    __decorate([
        action
    ], Notifications.prototype, "showError", void 0);
    __decorate([
        action
    ], Notifications.prototype, "showSuccess", void 0);
    __decorate([
        computed
    ], Notifications.prototype, "Output", null);
    return Notifications;
}());
export { Notifications };
