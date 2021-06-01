/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
import React, { useCallback, useState, } from 'react';
import { Box, Button, FormControl, OutlinedInput, withStyles, } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import styles from './styles';
import { useTranslation } from "react-i18next";
var EntityFieldBase64Image = withStyles(styles)(function (_a) {
    var classes = _a.classes, label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, options = _a.options;
    var _b = useState(''), innerError = _b[0], setInnerError = _b[1];
    var t = useTranslation().t;
    var getBase64 = useCallback(function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { var _a; return resolve(((_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) || ''); };
            reader.onerror = function (error) { return reject(error); };
        });
    }, []);
    var loadImage = useCallback(function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, photo, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!handler)
                        return [2 /*return*/];
                    if (!e.target.files)
                        return [2 /*return*/];
                    setInnerError('');
                    file = e.target.files[0];
                    if (!file)
                        return [2 /*return*/];
                    if ((options === null || options === void 0 ? void 0 : options.maxSize) && file.size > options.maxSize) {
                        setInnerError(t('The file is too big!'));
                        return [2 /*return*/];
                    }
                    if ((options === null || options === void 0 ? void 0 : options.maxSize) && file.size < options.minSize) {
                        setInnerError(t('The file is too small!'));
                        return [2 /*return*/];
                    }
                    if ((options === null || options === void 0 ? void 0 : options.allowedMimeType) &&
                        !options.allowedMimeType.includes(file.type)) {
                        setInnerError(t('The file type is not supported!'));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getBase64(file)];
                case 1:
                    photo = _a.sent();
                    img = new Image();
                    img.src = photo;
                    img.onload = function () {
                        var naturalWidth = img.naturalWidth, naturalHeight = img.naturalHeight;
                        if (options && options.minViewBox) {
                            var minWidth = options.minViewBox.width;
                            var minHeight = options.minViewBox.height;
                            if (naturalWidth < minWidth || naturalHeight < minHeight) {
                                setInnerError(t('Image size should not be less than {{width}}x{{height}} pixels', {
                                    width: minWidth,
                                    height: minHeight
                                }));
                                return;
                            }
                        }
                        if (options === null || options === void 0 ? void 0 : options.maxViewBox) {
                            var maxWidth = options.maxViewBox.width;
                            var maxHeight = options.maxViewBox.height;
                            if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
                                setInnerError(t('The size of the picture should not be more than {{width}}x{{height}} pixels', {
                                    width: maxWidth,
                                    height: maxHeight
                                }));
                                return;
                            }
                        }
                        handler(photo);
                    };
                    return [2 /*return*/];
            }
        });
    }); }, [handler, options, getBase64, t]);
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(FormControl, { variant: "outlined", className: classes.formControl, style: { position: 'relative' } },
            React.createElement("label", { htmlFor: label, className: classes.label },
                value ? (React.createElement("div", { className: classes.image, style: { backgroundImage: "url('" + value + "')" } })) : (''),
                React.createElement(OutlinedInput, { fullWidth: true, style: {
                        flexDirection: 'row-reverse',
                    }, error: !!innerError || !!error, className: classes.outlinedInput, inputComponent: function () { return (React.createElement(Button, { name: label, startIcon: React.createElement(ImageIcon, { fontSize: 'large' }), variant: "contained", style: {
                            display: 'flex',
                            width: 150,
                        } },
                        React.createElement("span", null, t('Upload')))); } }),
                React.createElement("input", { id: label, name: label, type: "file", onChange: loadImage, style: { position: 'absolute' }, accept: options && options.mimes ? options.mimes.join(', ') : '' })),
            (innerError || error) && (React.createElement(Box, { color: "error.main", fontSize: 12 }, innerError || error))))) : (React.createElement("div", { onClick: onClick },
        React.createElement("img", { alt: "base64image", src: value ? String(value) : '', className: classes.preview })));
});
export { EntityFieldBase64Image };
