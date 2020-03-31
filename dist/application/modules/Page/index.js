/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
var Page = /** @class */ (function () {
    function Page(fields) {
        this.title = '';
        this.menu = { enabled: true, label: '', url: '' };
        this.onMount = function () { };
        this.onUnmount = function () { };
        if (fields) {
            Object.assign(this, fields);
        }
    }
    Object.defineProperty(Page.prototype, "canList", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return !!(!this.roles ||
                (((_c = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) &&
                    (((_e = (_d = this.roles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role.toString())) || ((_j = (_h = this.roles) === null || _h === void 0 ? void 0 : _h.list) === null || _j === void 0 ? void 0 : _j.includes((_l = (_k = this.parent.auth) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.role.toString())))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "canEdit", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return !!(!this.roles ||
                (((_c = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) &&
                    (((_e = (_d = this.roles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role.toString())) || ((_j = (_h = this.roles) === null || _h === void 0 ? void 0 : _h.update) === null || _j === void 0 ? void 0 : _j.includes((_l = (_k = this.parent.auth) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.role.toString())))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "canCreate", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return !!(!this.roles ||
                (((_c = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) &&
                    (((_e = (_d = this.roles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role.toString())) || ((_j = (_h = this.roles) === null || _h === void 0 ? void 0 : _h.create) === null || _j === void 0 ? void 0 : _j.includes((_l = (_k = this.parent.auth) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.role.toString())))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement("h1", null, _this.title),
                React.createElement("div", null, "You can override this class to make your own cool entity"))); });
        },
        enumerable: true,
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
    ], Page.prototype, "canEdit", null);
    __decorate([
        computed
    ], Page.prototype, "canCreate", null);
    __decorate([
        computed
    ], Page.prototype, "output", null);
    return Page;
}());
export { Page };
