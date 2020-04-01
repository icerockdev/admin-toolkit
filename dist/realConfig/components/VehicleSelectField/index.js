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
import React, { useState, useEffect, useCallback, } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Axios from 'axios';
import { observer } from 'mobx-react';
var VehicleSelectField = observer(function (_a) {
    var data = _a.data, label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, options = _a.options, withToken = _a.withToken, isEditing = _a.isEditing;
    var _b = useState([]), vehicles = _b[0], setVehicles = _b[1];
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, withToken(function (_a) {
                            var token = _a.token;
                            return Axios.get(options.getVehiclesUrl + "/" + data.type + "/list", {
                                headers: { Authorization: token },
                            }).catch(function (e) { return e; });
                        }, {})];
                    case 1:
                        result = _b.sent();
                        if (!((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data))
                            return [2 /*return*/];
                        setVehicles(result.data.data);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [options.getVehiclesUrl, data.type]);
    var onVehicleChange = useCallback(function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            handler(parseInt(event.target.value) || null);
            return [2 /*return*/];
        });
    }); }, [data, options, handler]);
    return isEditing ? (React.createElement(FormControl, { variant: "outlined" },
        React.createElement(InputLabel, { htmlFor: label }, label),
        React.createElement(Select, { variant: "outlined", id: label, name: label, label: label, value: value || '', onChange: onVehicleChange, error: !!error, inputProps: { className: 'select' } },
            React.createElement(MenuItem, { value: "" }, "..."),
            vehicles.length > 0 &&
                vehicles.map(function (vehicle) { return (React.createElement(MenuItem, { key: vehicle.value, value: vehicle.value }, vehicle.label)); })))) : (React.createElement("div", null, (data === null || data === void 0 ? void 0 : data.vehicle) || ''));
});
export { VehicleSelectField };
