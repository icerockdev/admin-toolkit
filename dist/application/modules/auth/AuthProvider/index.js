/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EMPTY_USER, UNAUTHORIZED, } from '../../../types/auth';
import { action, computed, flow, observable, reaction } from 'mobx';
import { AuthRouter } from '../../../../containers/login/AuthRouter';
import { AuthVerticalLayout } from '../../../layouts/login/AuthVerticalLayout';
import { has } from 'ramda';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(options) {
        var _this = this;
        // From props
        this.splash = '';
        this.layout = AuthVerticalLayout;
        this.user = EMPTY_USER;
        this.persist = true;
        this.router = AuthRouter;
        this.loginLabel = 'Логин';
        this.getUserName = function () { var _a; return ((_a = _this.user) === null || _a === void 0 ? void 0 : _a.username) || ''; };
        this.getUserRoleTitle = function () {
            var role = _this.user.role;
            if (!role)
                return '';
            if (role && _this.roleTitles && has(role, _this.roleTitles))
                return _this.roleTitles[role];
            return role || '';
        };
        this.getUserRole = function () {
            return _this.user.role || '';
        };
        // Built-in
        this.isLoading = false;
        this.error = '';
        this.sendAuthRequest = function (email, password) {
            _this.sendAuthRequestCancel();
            _this.sendAuthRequestInstance = flow(function sendAuthRequest() {
                var response, e_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.authRequestFn)
                                return [2 /*return*/];
                            this.isLoading = true;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.authRequestFn(email, password).catch(function () { return null; })];
                        case 2:
                            response = _b.sent();
                            if (!response || response.error) {
                                throw new Error(response.error);
                            }
                            this.user = response.user;
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            this.error = e_1;
                            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showError(e_1.toString());
                            return [3 /*break*/, 5];
                        case 4:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        this.sendAuthRequestCancel = function () {
            if (_this.sendAuthRequestInstance && _this.sendAuthRequestInstance.cancel) {
                _this.sendAuthRequestInstance.cancel();
            }
        };
        this.sendAuthPasswRestore = function (email) {
            _this.sendAuthPasswRestoreCancel();
            _this.sendAuthPasswRestoreInstance = flow(function sendAuthPasswRestore() {
                var response, e_2;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.authPasswRestoreFn)
                                return [2 /*return*/];
                            this.isLoading = true;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.authPasswRestoreFn(email).catch(function () { return null; })];
                        case 2:
                            response = _d.sent();
                            if (!response || response.error) {
                                throw new Error(response.error);
                            }
                            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showSuccess('Check your email');
                            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.history.push('/');
                            return [3 /*break*/, 5];
                        case 3:
                            e_2 = _d.sent();
                            this.error = e_2;
                            (_c = this.parent) === null || _c === void 0 ? void 0 : _c.notifications.showError(e_2.toString());
                            return [3 /*break*/, 5];
                        case 4:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        this.sendAuthPasswRestoreCancel = function () {
            if (_this.sendAuthPasswRestoreInstance &&
                _this.sendAuthPasswRestoreInstance.cancel) {
                try {
                    _this.sendAuthPasswRestoreInstance.cancel();
                }
                catch (e) { }
            }
        };
        this.sendAuthPasswUpdate = function (token, password) {
            _this.sendAuthPasswRestoreCancel();
            _this.sendAuthPasswUpdateInstance = flow(function sendAuthPasswUpdate() {
                var response, e_3;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.authPasswUpdateFn)
                                return [2 /*return*/];
                            this.isLoading = true;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, 4, 5]);
                            if (!token.trim()) {
                                throw new Error("Token is empty");
                            }
                            if (this.passwordValidator && this.passwordValidator(password)) {
                                throw new Error(this.passwordValidator(password));
                            }
                            return [4 /*yield*/, this.authPasswUpdateFn(token, password).catch(function () { return null; })];
                        case 2:
                            response = _d.sent();
                            if (!response || response.error) {
                                throw new Error(response.error);
                            }
                            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showSuccess('You can now log in');
                            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.history.push('/');
                            return [3 /*break*/, 5];
                        case 3:
                            e_3 = _d.sent();
                            this.error = e_3;
                            (_c = this.parent) === null || _c === void 0 ? void 0 : _c.notifications.showError(e_3.toString());
                            return [3 /*break*/, 5];
                        case 4:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        this.sendAuthPasswUpdateCancel = function () {
            if (_this.sendAuthPasswUpdateInstance &&
                _this.sendAuthPasswUpdateInstance.cancel) {
                try {
                    _this.sendAuthPasswUpdateInstance.cancel();
                }
                catch (e) { }
            }
        };
        this.getPersistedCredentials = function () {
            try {
                var user = JSON.parse(localStorage.getItem('user') || '{}');
                if (typeof user != 'object')
                    return {};
                return user;
            }
            catch (e) {
                return {};
            }
        };
        this.persistCredentials = function () {
            localStorage.setItem('user', JSON.stringify(_this.user));
        };
        this.logout = function () {
            _this.user = EMPTY_USER;
        };
        /**
         * Passes token variable to {args}
         * @param req - request function
         * @param args - args object, that'll be extended with token
         */
        this.withToken = function (req, args) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, req(__assign(__assign({}, args), { token: this.user.token }))];
                    case 1:
                        result = _b.sent();
                        if (result === null || result === void 0 ? void 0 : result.error) {
                            throw new Error(result.error);
                        }
                        return [2 /*return*/, result];
                    case 2:
                        e_4 = _b.sent();
                        if (e_4.toString() === UNAUTHORIZED) {
                            this.user = EMPTY_USER;
                        }
                        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showError(e_4.toString());
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (options) {
            Object.assign(this, options);
        }
        if (this.persist) {
            var user = this.getPersistedCredentials().user;
            if (user) {
                this.user = __assign(__assign({}, EMPTY_USER), user);
            }
            reaction(function () { return _this.user; }, this.persistCredentials);
        }
    }
    Object.defineProperty(AuthProvider.prototype, "userName", {
        get: function () {
            return this.getUserName(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthProvider.prototype, "userRoleTitle", {
        get: function () {
            return this.getUserRoleTitle(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthProvider.prototype, "userRole", {
        get: function () {
            return this.getUserRole(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthProvider.prototype, "isLogged", {
        get: function () {
            return !!this.user.token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthProvider.prototype, "output", {
        get: function () {
            return this.router;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], AuthProvider.prototype, "splash", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "layout", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "parent", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "user", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "authRequestFn", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "authPasswRestoreFn", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "authPasswUpdateFn", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "roleTitles", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "persist", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "passwordValidator", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "router", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "loginLabel", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "getUserName", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "getUserRoleTitle", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "getUserRole", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "isLoading", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "error", void 0);
    __decorate([
        computed
    ], AuthProvider.prototype, "userName", null);
    __decorate([
        computed
    ], AuthProvider.prototype, "userRoleTitle", null);
    __decorate([
        computed
    ], AuthProvider.prototype, "userRole", null);
    __decorate([
        action
    ], AuthProvider.prototype, "sendAuthRequest", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "sendAuthPasswRestore", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "sendAuthPasswUpdate", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "logout", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "withToken", void 0);
    __decorate([
        computed
    ], AuthProvider.prototype, "isLogged", null);
    __decorate([
        computed
    ], AuthProvider.prototype, "output", null);
    return AuthProvider;
}());
export { AuthProvider };
