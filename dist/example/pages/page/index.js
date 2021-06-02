/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from "react";
import { Page, useConfig } from '../../../application';
import { computed } from "mobx";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import i18n from "../../../i18n";
var CustomPage = /** @class */ (function (_super) {
    __extends(CustomPage, _super);
    function CustomPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CustomPage.prototype, "output", {
        get: function () {
            var _this = this;
            var config = useConfig();
            return observer(function () { return (React.createElement("div", null,
                React.createElement("h1", null,
                    i18n.t(_this.title),
                    " - ",
                    config.debug ? 'Development' : 'Production'),
                React.createElement("div", null,
                    "Navigate to ",
                    React.createElement(NavLink, { to: "/test-hidden" }, "hidden page"),
                    " (not listed in navigation)"))); });
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        computed
    ], CustomPage.prototype, "output", null);
    return CustomPage;
}(Page));
export default new CustomPage({
    title: 'custom:Page',
    menu: {
        enabled: true,
        url: '/test',
        label: 'custom:Sample page',
    },
});
