/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { createBrowserHistory } from 'history';
import { Notifications } from '../../common/Notification';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { computed, observable } from 'mobx';
import { DEFAULT_THEME } from '../../../../utils/theme';
import { VerticalLayout } from '../../../layouts/application/VerticalLayout';
import { DEFAULT_LANGUAGES } from '../../../../i18n';
var Config = /** @class */ (function () {
    function Config(options) {
        var _this = this;
        this.debug = process.env.NODE_ENV !== 'production';
        this.name = '';
        this.pages = [];
        this.i18nDefaultLanguage = 'en';
        this.i18nLanguages = DEFAULT_LANGUAGES;
        this.i18nUseBrowserLanguageDetector = true;
        this.i18nResourcesContext = require.context('~/locales', true, /\.json$/);
        this.theme = {};
        this.history = createBrowserHistory();
        this.notifications = new Notifications();
        this.themeInstance = createMuiTheme(DEFAULT_THEME);
        this.layout = VerticalLayout;
        if (options) {
            Object.assign(this, options);
        }
        if (this.pages.length) {
            this.pages.forEach(function (page) {
                page.parent = _this;
            });
        }
        if (this.auth) {
            this.auth.parent = this;
        }
        if (options === null || options === void 0 ? void 0 : options.theme)
            this.themeInstance = createMuiTheme(__assign(__assign({}, DEFAULT_THEME), options.theme));
        if (options === null || options === void 0 ? void 0 : options.layout) {
            this.layout = options.layout;
        }
        this.host = options === null || options === void 0 ? void 0 : options.host;
    }
    Object.defineProperty(Config.prototype, "pagesForCurrentUser", {
        get: function () {
            return this.pages.filter(function (page) { var _a; return ((_a = page === null || page === void 0 ? void 0 : page.menu) === null || _a === void 0 ? void 0 : _a.url) && page.canList; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "linksForCurrentUser", {
        get: function () {
            return this.pagesForCurrentUser.map(function (page) { return ({
                name: page.menu.label,
                url: page.menu.url,
                enabled: page.menu.enabled,
                childFields: page.menu.childFields,
            }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "fallbackUrl", {
        get: function () {
            var _a;
            return ((((_a = this.linksForCurrentUser) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                this.linksForCurrentUser[0].url) ||
                '/');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], Config.prototype, "debug", void 0);
    __decorate([
        observable
    ], Config.prototype, "host", void 0);
    __decorate([
        observable
    ], Config.prototype, "name", void 0);
    __decorate([
        observable
    ], Config.prototype, "pages", void 0);
    __decorate([
        observable
    ], Config.prototype, "auth", void 0);
    __decorate([
        observable
    ], Config.prototype, "logo", void 0);
    __decorate([
        observable
    ], Config.prototype, "title", void 0);
    __decorate([
        observable
    ], Config.prototype, "i18nDefaultLanguage", void 0);
    __decorate([
        observable
    ], Config.prototype, "i18nLanguages", void 0);
    __decorate([
        observable
    ], Config.prototype, "i18nUseBrowserLanguageDetector", void 0);
    __decorate([
        observable
    ], Config.prototype, "i18nResourcesContext", void 0);
    __decorate([
        observable
    ], Config.prototype, "theme", void 0);
    __decorate([
        observable
    ], Config.prototype, "history", void 0);
    __decorate([
        observable
    ], Config.prototype, "notifications", void 0);
    __decorate([
        observable
    ], Config.prototype, "themeInstance", void 0);
    __decorate([
        observable
    ], Config.prototype, "layout", void 0);
    __decorate([
        computed
    ], Config.prototype, "pagesForCurrentUser", null);
    __decorate([
        computed
    ], Config.prototype, "linksForCurrentUser", null);
    __decorate([
        computed
    ], Config.prototype, "fallbackUrl", null);
    return Config;
}());
export { Config };
