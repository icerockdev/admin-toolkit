/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { computed } from 'mobx';
import { createBrowserHistory } from 'history';
var Config = /** @class */ (function () {
    function Config(fields) {
        var _this = this;
        this.name = '';
        this.pages = [];
        this.history = createBrowserHistory();
        if (fields) {
            Object.assign(this, fields);
        }
        if (this.pages.length) {
            this.pages.forEach(function (page) {
                page.parent = _this;
            });
        }
    }
    Object.defineProperty(Config.prototype, "Layout", {
        get: function () {
            return React.createElement("div", null, "LAYOUT");
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        computed
    ], Config.prototype, "Layout", null);
    return Config;
}());
export { Config };
