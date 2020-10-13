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
import React from 'react';
import { FeatureField } from '../FeatureField';
import { computed, observable } from 'mobx';
import { format, parseISO } from 'date-fns/esm';
import { DateFilter } from '../../filters/DateFilter';
import { DateInput } from '../../components/inputs/DateInput';
import { observer } from 'mobx-react';
var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField(name, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, name, options) || this;
        _this.name = name;
        _this.options = options;
        _this.filterExact = false;
        _this.dateFormat = 'dd.MM.yyyy';
        _this.parser = function (val) { return parseISO(val); };
        _this.formatter = function (val) {
            return format(val, _this.dateFormat);
        };
        _this.Filter = observer(function (_a) {
            var inline = _a.inline;
            return (React.createElement(DateFilter, { label: _this.label, name: _this.name, value: _this.filterValue, onChange: _this.onFilterChange, onReset: _this.onFilterReset, isRange: !_this.filterExact, inline: inline }));
        });
        var parser = options.parser, dateFormat = options.format, formatter = options.formatter, filterExact = options.filterExact;
        if (parser)
            _this.parser = parser;
        if (dateFormat)
            _this.dateFormat = dateFormat;
        if (formatter)
            _this.formatter = formatter;
        if (filterExact)
            _this.filterExact = filterExact;
        return _this;
    }
    DateField.prototype.formatValue = function (val) {
        var date = this.parser(val);
        return this.formatter(date);
    };
    DateField.prototype.asString = function (val) {
        return this.formatValue(val);
    };
    Object.defineProperty(DateField.prototype, "List", {
        get: function () {
            var _this = this;
            return function (_a) {
                var value = _a.value;
                return (React.createElement("div", null, (!!value && _this.formatValue(value)) || ''));
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateField.prototype, "Update", {
        get: function () {
            var _a;
            return (React.createElement(DateInput, { value: this.editValue, label: this.label, onChange: this.onChange, error: this.editError, isLoading: (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.isLoading }));
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], DateField.prototype, "filterExact", void 0);
    __decorate([
        observable
    ], DateField.prototype, "dateFormat", void 0);
    __decorate([
        observable
    ], DateField.prototype, "parser", void 0);
    __decorate([
        observable
    ], DateField.prototype, "formatter", void 0);
    __decorate([
        computed
    ], DateField.prototype, "List", null);
    __decorate([
        computed
    ], DateField.prototype, "Update", null);
    __decorate([
        observable
    ], DateField.prototype, "Filter", void 0);
    return DateField;
}(FeatureField));
export { DateField };
