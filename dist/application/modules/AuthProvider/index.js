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
// import React from 'react';
import { EMPTY_USER } from '../../types/auth';
import { computed, observable, action } from 'mobx';
import { flow } from 'mobx';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(fields) {
        var _this = this;
        this.user = EMPTY_USER;
        // Built-in
        this.isLoading = false;
        this.error = '';
        this.sendAuthRequest = function (_a) {
            var email = _a.email, password = _a.password;
            _this.sendAuthRequestCancel();
            _this.sendAuthRequestInstance = flow(function sendAuthRequest() {
                var response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.authRequestFn)
                                return [2 /*return*/];
                            this.isLoading = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.authRequestFn(email, password).catch(function () { return null; })];
                        case 2:
                            response = _a.sent();
                            if (!response || response.error) {
                                throw new Error(response.error);
                            }
                            this.user = response.user;
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            this.error = e_1;
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
        this.logout = function () {
            _this.user = EMPTY_USER;
        };
        this.withToken = function (req, args) {
            return req(__assign(__assign({}, args), { token: _this.user.token }));
        };
        if (fields) {
            Object.assign(this, fields);
        }
    }
    Object.defineProperty(AuthProvider.prototype, "isLogged", {
        get: function () {
            return !!this.user.token;
        },
        enumerable: true,
        configurable: true
    });
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
    ], AuthProvider.prototype, "isLoading", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "error", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "sendAuthRequest", void 0);
    __decorate([
        action
    ], AuthProvider.prototype, "logout", void 0);
    __decorate([
        observable
    ], AuthProvider.prototype, "withToken", void 0);
    __decorate([
        computed
    ], AuthProvider.prototype, "isLogged", null);
    return AuthProvider;
}());
export { AuthProvider };
