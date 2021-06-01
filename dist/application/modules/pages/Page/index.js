/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
var Page = /** @class */ (function () {
    function Page(fields) {
        this.title = 'Admin Toolkit';
        this.menu = { enabled: true, label: '', url: '' };
        this.onMount = function () {
        };
        this.onUnmount = function () {
        };
        if (fields) {
            Object.assign(this, fields);
        }
    }
    Object.defineProperty(Page.prototype, "canList", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return !!(!this.roles ||
                !((_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) ||
                (((_d = (_c = (_b = this.parent) === null || _b === void 0 ? void 0 : _b.auth) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.role) && ((_e = this.roles) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role))));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement("h1", null, _this.title),
                React.createElement("p", null, "You can override this class to make your own cool entity"))); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "forbiddenPlaceholder", {
        get: function () {
            return React.createElement("div", { className: styles.wrap },
                React.createElement("div", { className: styles.error },
                    React.createElement("h1", null, "Forbidden"),
                    React.createElement("p", null, "You don't have permission to perform that action")));
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], Page.prototype, "title", void 0);
    __decorate([
        observable
    ], Page.prototype, "menu", void 0);
    __decorate([
        observable
    ], Page.prototype, "parent", void 0);
    __decorate([
        observable
    ], Page.prototype, "roles", void 0);
    __decorate([
        action
    ], Page.prototype, "onMount", void 0);
    __decorate([
        action
    ], Page.prototype, "onUnmount", void 0);
    __decorate([
        computed
    ], Page.prototype, "canList", null);
    __decorate([
        computed
    ], Page.prototype, "output", null);
    return Page;
}());
export { Page };
