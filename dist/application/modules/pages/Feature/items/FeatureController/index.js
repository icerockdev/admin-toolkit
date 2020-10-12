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
import { action, extendObservable, flow, observable } from 'mobx';
import { controllerGetList } from './list';
import { FeatureMode } from '../../types';
import { controllerGetRead } from './read';
import { controllerGetReferences } from './references';
import { controllerPostCreate } from './create';
import { controllerPostUpdate } from './update';
import { controllerDelete } from './delete';
import { controllerSeedData } from './seed';
var FeatureController = /** @class */ (function () {
    function FeatureController(feature) {
        var _this = this;
        this.feature = feature;
        /**
         * Map for all currently running async fetchers, that can be cancelled by
         * calling item.cancel() or this.cancelAll()
         */
        this.instances = {};
        /**
         * Loads list of items
         */
        this.beforeListMode = function () {
            _this.cancelAll();
            _this.instances.listLoader = flow(controllerGetList)(_this);
        };
        /**
         * Loads data of currently viewing item
         */
        this.beforeReadMode = function () {
            _this.cancelAll();
            _this.instances.read = flow(controllerGetRead)(_this);
            _this.instances.read = flow(controllerGetReferences)(_this);
        };
        /**
         * Loads data of currently editing item
         */
        this.beforeUpdateMode = function () {
            _this.cancelAll();
            _this.feature.data.clearErrors();
            _this.instances.update = flow(controllerGetRead)(_this);
            _this.instances.update.then(function () { return _this.feature.data.copyReadToEditor(); });
            _this.instances.update = flow(controllerGetReferences)(_this);
        };
        /**
         * Clears current data and loading references on create form
         */
        this.beforeCreateMode = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cancelAll();
                        this.feature.data.clearReadData();
                        this.feature.data.clearEditorData();
                        this.feature.data.clearErrors();
                        this.feature.data.isLoading = false;
                        this.seedData();
                        this.instances.create = flow(controllerGetReferences)(this);
                        return [4 /*yield*/, this.instances.create];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Deletes current item
         */
        this.delete = function () {
            flow(controllerDelete)(_this);
        };
        /**
         * Cancels all currently loading functions
         */
        this.cancelAll = function () {
            Object.values(_this.instances).forEach(function (instance) {
                if (instance.cancel)
                    instance.cancel();
            });
        };
        /**
         * Returns id of currently editing / viewing item
         */
        this.getIdFromUrl = function () {
            var re = new RegExp(_this.feature.url.replace(/\//gim, '\\/') + "\\/([^/]+)");
            var match = window.location.pathname.match(re);
            return parseInt(match && match.length > 0 ? match[1] : '', 10);
        };
        /**
         * Called on action (list, read, update, create) change
         */
        this.onActionChange = function () {
            _this.cancelAll();
            switch (_this.feature.mode) {
                case FeatureMode.read:
                    return _this.beforeReadMode();
                case FeatureMode.list:
                    return _this.beforeListMode();
                case FeatureMode.update:
                    return _this.beforeUpdateMode();
                case FeatureMode.create:
                    return _this.beforeCreateMode();
                default:
                    return;
            }
        };
        /**
         * Called on submit of editor / creator. Handles validation and launching submitting function for each mode
         */
        this.submitItem = function () {
            var _a;
            if (_this.feature.data.isLoading)
                return;
            _this.cancelAll();
            var validation = _this.validateFields();
            if (validation) {
                _this.feature.data.errors = validation;
                (_a = _this.feature.parent) === null || _a === void 0 ? void 0 : _a.notifications.showError('Проверьте все поля');
                return;
            }
            switch (_this.feature.mode) {
                case FeatureMode.create:
                    _this.instances.create = flow(controllerPostCreate)(_this);
                    break;
                case FeatureMode.update:
                    _this.instances.create = flow(controllerPostUpdate)(_this);
                    break;
            }
        };
        /**
         * Returns list of validation errors for currently visible fields
         */
        this.validateFields = function () {
            var fields = _this.feature.fieldsOfCurrentMode
                .filter(function (field) { return field.validator; })
                .reduce(function (acc, field) {
                var _a;
                if (!field.validator)
                    return acc;
                var error = field.validator(field.editValue, field);
                if (!error)
                    return acc;
                return __assign(__assign({}, acc), (_a = {}, _a[field.name] = error, _a));
            }, {});
            return Object.keys(fields).length > 0 ? fields : undefined;
        };
        extendObservable(this, { feature: feature });
    }
    FeatureController.prototype.seedData = function () {
        controllerSeedData(this);
    };
    __decorate([
        observable
    ], FeatureController.prototype, "instances", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "beforeListMode", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "beforeReadMode", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "beforeUpdateMode", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "beforeCreateMode", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "delete", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "onActionChange", void 0);
    __decorate([
        action
    ], FeatureController.prototype, "submitItem", void 0);
    return FeatureController;
}());
export { FeatureController };
