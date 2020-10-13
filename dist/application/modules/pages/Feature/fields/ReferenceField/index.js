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
import { SelectField } from '../SelectField';
import { computed, observable } from 'mobx';
import { Placeholder } from '../../components/common/Placeholder';
import { observer } from 'mobx-react';
import { SelectInput } from '../../components/inputs/SelectInput';
var ReferenceField = /** @class */ (function (_super) {
    __extends(ReferenceField, _super);
    function ReferenceField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autocomplete = true;
        return _this;
    }
    Object.defineProperty(ReferenceField.prototype, "isLoading", {
        get: function () {
            var _a;
            return ((_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.references[this.name].isLoadingAll) || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReferenceField.prototype, "listVariants", {
        get: function () {
            var _a;
            return ((_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.references[this.name].all) || {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReferenceField.prototype, "List", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var value = _a.value;
                return (React.createElement(Placeholder, { isLoading: _this.isLoading },
                    React.createElement("div", null, _this.formatValue(value))));
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReferenceField.prototype, "Update", {
        get: function () {
            var _a;
            return (React.createElement(SelectInput, { label: this.label, onChange: this.onChange, variants: this.filterVariants, value: this.editValue, autocomplete: this.autocomplete, isLoadingReference: this.isLoading, isLoading: (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.isLoading, error: this.editError }));
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], ReferenceField.prototype, "autocomplete", void 0);
    __decorate([
        computed
    ], ReferenceField.prototype, "isLoading", null);
    __decorate([
        computed
    ], ReferenceField.prototype, "listVariants", null);
    __decorate([
        computed
    ], ReferenceField.prototype, "List", null);
    __decorate([
        computed
    ], ReferenceField.prototype, "Update", null);
    return ReferenceField;
}(SelectField));
export { ReferenceField };
