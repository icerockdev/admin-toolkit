import React from 'react';
import { FilterWrapper } from '../../../filters/FilterWrapper';
import { SelectInput } from '../../inputs/SelectInput';
import { observer } from 'mobx-react';
var SelectFilter = observer(function (_a) {
    var label = _a.label, variants = _a.variants, inline = _a.inline, autocomplete = _a.autocomplete, onChange = _a.onChange, onReset = _a.onReset, disabled = _a.disabled, value = _a.value;
    return (React.createElement(FilterWrapper, { onClear: onReset, inline: inline },
        React.createElement(SelectInput, { label: label, onChange: onChange, variants: variants, autocomplete: autocomplete, disabled: disabled, value: value })));
});
export { SelectFilter };
