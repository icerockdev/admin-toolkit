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
import { FeatureField } from '../FeatureField';
import { observable } from 'mobx';
import React from 'react';
var IntegerField = /** @class */ (function (_super) {
    __extends(IntegerField, _super);
    function IntegerField(name, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, name, options) || this;
        _this.name = name;
        _this.options = options;
        _this.filterExact = false;
        _this.accuracy = 1;
        _this.preserveZero = false;
        _this.defaultValue = 0;
        _this.List = function (_a) {
            var value = _a.value;
            return (React.createElement("div", null, (value && _this.formatValue(value)) || ''));
        };
        var filterExact = options.filterExact, accuracy = options.accuracy, preserveZero = options.preserveZero;
        if (filterExact)
            _this.filterExact = filterExact;
        if (accuracy)
            _this.accuracy = accuracy;
        if (preserveZero)
            _this.preserveZero = preserveZero;
        return _this;
    }
    IntegerField.prototype.formatValue = function (val) {
        return this.preserveZero
            ? val.toFixed(this.accuracy)
            : parseFloat(val.toFixed(this.accuracy));
    };
    IntegerField.prototype.asString = function (val) {
        return this.formatValue(val);
    };
    __decorate([
        observable
    ], IntegerField.prototype, "filterExact", void 0);
    __decorate([
        observable
    ], IntegerField.prototype, "accuracy", void 0);
    __decorate([
        observable
    ], IntegerField.prototype, "preserveZero", void 0);
    __decorate([
        observable
    ], IntegerField.prototype, "defaultValue", void 0);
    __decorate([
        observable
    ], IntegerField.prototype, "List", void 0);
    return IntegerField;
}(FeatureField));
export { IntegerField };
