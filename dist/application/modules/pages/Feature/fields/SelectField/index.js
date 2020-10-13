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
import { computed, observable } from 'mobx';
import React from 'react';
import { SelectFilter } from '../../filters/SelectFilter';
import { observer } from 'mobx-react';
import { SelectInput } from '../../components/inputs/SelectInput';
var SelectField = /** @class */ (function (_super) {
    __extends(SelectField, _super);
    function SelectField(name, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, name, options) || this;
        _this.name = name;
        _this.options = options;
        _this.variants = {};
        _this.autocomplete = false;
        _this.Filter = observer(function (_a) {
            var inline = _a.inline;
            return (React.createElement(SelectFilter, { label: _this.label, name: _this.name, value: _this.filterValue, onChange: _this.onFilterChange, onReset: _this.onFilterReset, variants: _this.filterVariants, autocomplete: Object.keys(_this.variants).length > 10 || _this.autocomplete, inline: inline }));
        });
        if (options.options)
            _this.variants = options.options;
        if (options.autocomplete)
            _this.autocomplete = true;
        return _this;
    }
    Object.defineProperty(SelectField.prototype, "listVariants", {
        get: function () {
            return this.variants;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectField.prototype, "filterVariants", {
        get: function () {
            return this.listVariants;
        },
        enumerable: false,
        configurable: true
    });
    SelectField.prototype.formatValue = function (val) {
        return Object.prototype.hasOwnProperty.call(this.listVariants, val)
            ? this.listVariants[val]
            : val;
    };
    SelectField.prototype.asString = function (val) {
        return this.formatValue(val);
    };
    Object.defineProperty(SelectField.prototype, "List", {
        get: function () {
            var _this = this;
            return function (_a) {
                var value = _a.value;
                return React.createElement("div", null, _this.listVariants[value]);
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectField.prototype, "Update", {
        get: function () {
            var _a;
            return (React.createElement(SelectInput, { label: this.label, onChange: this.onChange, variants: this.filterVariants, value: this.editValue, error: this.editError, isLoading: (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.isLoading, autocomplete: Object.keys(this.variants).length > 10 || this.autocomplete }));
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], SelectField.prototype, "variants", void 0);
    __decorate([
        observable
    ], SelectField.prototype, "autocomplete", void 0);
    __decorate([
        computed
    ], SelectField.prototype, "listVariants", null);
    __decorate([
        computed
    ], SelectField.prototype, "filterVariants", null);
    __decorate([
        computed
    ], SelectField.prototype, "List", null);
    __decorate([
        computed
    ], SelectField.prototype, "Update", null);
    __decorate([
        observable
    ], SelectField.prototype, "Filter", void 0);
    return SelectField;
}(FeatureField));
export { SelectField };
