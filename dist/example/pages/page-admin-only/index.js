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
import { Page } from '../../../application';
import { computed } from "mobx";
import { observer } from "mobx-react";
import i18n from "../../../i18n";
var AdminOnlyPage = /** @class */ (function (_super) {
    __extends(AdminOnlyPage, _super);
    function AdminOnlyPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AdminOnlyPage.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement("h1", null, i18n.t(_this.title)))); });
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        computed
    ], AdminOnlyPage.prototype, "output", null);
    return AdminOnlyPage;
}(Page));
export default new AdminOnlyPage({
    title: 'Admin only page',
    menu: {
        enabled: true,
        url: '/admin-only',
        label: 'Admin only page',
    },
    roles: ['admin']
});
