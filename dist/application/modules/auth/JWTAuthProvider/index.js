/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
import { AUTH_ERRORS, EMPTY_USER, UNAUTHORIZED, } from '../../../types/auth';
import { action, computed, flow, observable, reaction } from 'mobx';
import { AuthProvider } from '../AuthProvider';
var EMPTY_TOKENS = {
    access: '',
    refresh: '',
};
var JWTAuthProvider = /** @class */ (function (_super) {
    __extends(JWTAuthProvider, _super);
    function JWTAuthProvider(fields) {
        var _this = _super.call(this, fields) || this;
        _this.tokens = EMPTY_TOKENS;
        _this.sendAuthRequest = function (email, password) {
            _this.sendAuthRequestCancel();
            _this.sendAuthRequestInstance = flow(function sendAuthRequest() {
                var response, e_1;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.authRequestFn)
                                return [2 /*return*/];
                            this.isLoading = true;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.authRequestFn(email, password)];
                        case 2:
                            response = _d.sent();
                            if (!response || response.error) {
                                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showError((response === null || response === void 0 ? void 0 : response.error) || AUTH_ERRORS.CANT_LOGIN);
                                throw new Error(response === null || response === void 0 ? void 0 : response.error);
                            }
                            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.notifications.hideNotification();
                            this.user = response.user;
                            this.tokens = response.tokens;
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _d.sent();
                            this.error = e_1;
                            (_c = this.parent) === null || _c === void 0 ? void 0 : _c.notifications.showError(e_1.toString());
                            return [3 /*break*/, 5];
                        case 4:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.sendAuthRequestCancel = function () {
            if (_this.sendAuthRequestInstance && _this.sendAuthRequestInstance.cancel) {
                _this.sendAuthRequestInstance.cancel();
            }
        };
        _this.logout = function () {
            _this.user = EMPTY_USER;
            _this.tokens = EMPTY_TOKENS;
        };
        _this.withToken = function (req, args) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req(__assign(__assign({}, args), { token: "Bearer " + this.tokens.access }))
                            .then(function (result) {
                            if ((result === null || result === void 0 ? void 0 : result.error) === UNAUTHORIZED) {
                                throw new Error(UNAUTHORIZED);
                            }
                            return result;
                        })
                            .catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var tokens;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(e.message === UNAUTHORIZED && this.tokenRefreshFn)) return [3 /*break*/, 7];
                                        if (!!this.tokenRefreshInstance) return [3 /*break*/, 2];
                                        this.tokenRefreshInstance = flow(function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!this.tokenRefreshFn)
                                                            return [2 /*return*/, { access: '', refresh: '' }];
                                                        return [4 /*yield*/, this.tokenRefreshFn(this.tokens.refresh)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        }).bind(this)();
                                        return [4 /*yield*/, this.tokenRefreshInstance];
                                    case 1:
                                        tokens = _b.sent();
                                        this.tokens = {
                                            access: tokens.access || '',
                                            refresh: tokens.refresh,
                                        };
                                        this.tokenRefreshInstance = null;
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, this.tokenRefreshInstance];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        if (!(this.tokens.access && this.tokens.refresh)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, req(__assign(__assign({}, args), { token: "Bearer " + this.tokens.access }))];
                                    case 5: return [2 /*return*/, _b.sent()];
                                    case 6:
                                        this.user = EMPTY_USER;
                                        this.tokens = EMPTY_TOKENS;
                                        return [3 /*break*/, 8];
                                    case 7:
                                        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.notifications.showError(e.message);
                                        _b.label = 8;
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getPersistedCredentials = function () {
            try {
                var user = JSON.parse(localStorage.getItem('user') || '{}');
                var tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
                if (typeof user != 'object')
                    return {};
                return { user: user, tokens: tokens };
            }
            catch (e) {
                return {};
            }
        };
        _this.persistCredentials = function () {
            localStorage.setItem('user', JSON.stringify(_this.user));
        };
        _this.persistTokens = function () {
            localStorage.setItem('tokens', JSON.stringify(_this.tokens));
        };
        if (_this.persist) {
            var _a = _this.getPersistedCredentials(), user = _a.user, tokens = _a.tokens;
            if (user) {
                _this.user = user;
            }
            if (tokens) {
                _this.tokens = tokens;
            }
            reaction(function () { return _this.tokens; }, _this.persistTokens);
            reaction(function () { return _this.user; }, _this.persistCredentials);
        }
        return _this;
    }
    Object.defineProperty(JWTAuthProvider.prototype, "isLogged", {
        get: function () {
            return !!this.tokens.access;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JWTAuthProvider.prototype, "token", {
        get: function () {
            return "Bearer " + this.tokens.access;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], JWTAuthProvider.prototype, "tokens", void 0);
    __decorate([
        observable
    ], JWTAuthProvider.prototype, "authRequestFn", void 0);
    __decorate([
        observable
    ], JWTAuthProvider.prototype, "tokenRefreshFn", void 0);
    __decorate([
        action
    ], JWTAuthProvider.prototype, "sendAuthRequest", void 0);
    __decorate([
        action
    ], JWTAuthProvider.prototype, "logout", void 0);
    __decorate([
        action
    ], JWTAuthProvider.prototype, "withToken", void 0);
    __decorate([
        computed
    ], JWTAuthProvider.prototype, "isLogged", null);
    __decorate([
        computed
    ], JWTAuthProvider.prototype, "token", null);
    return JWTAuthProvider;
}(AuthProvider));
export { JWTAuthProvider };
