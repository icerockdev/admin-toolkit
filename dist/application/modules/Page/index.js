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
        action
    ], Page.prototype, "onMount", void 0);
    __decorate([
        action
    ], Page.prototype, "onUnmount", void 0);
    __decorate([
        computed
    ], Page.prototype, "output", null);
    return Page;
}());
export { Page };
