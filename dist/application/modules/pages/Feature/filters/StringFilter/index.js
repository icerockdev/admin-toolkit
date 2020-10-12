import React from 'react';
import styles from './styles.module.scss';
import { FilterWrapper } from '../../components/filters/FilterWrapper';
import { StringInput } from '../../components/inputs/StringInput';
var StringFilter = function (_a) {
    var label = _a.label, name = _a.name, value = _a.value, onChange = _a.onChange, onReset = _a.onReset, inline = _a.inline;
    return (React.createElement(FilterWrapper, { onClear: onReset, inline: inline },
        React.createElement("div", { className: styles.input },
            React.createElement(StringInput, { label: inline ? '' : label, onChange: onChange, value: value }))));
};
export { StringFilter };
