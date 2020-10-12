import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '../../common/Placeholder';
var StringInput = observer(function (_a) {
    var value = _a.value, label = _a.label, error = _a.error, onChange = _a.onChange, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var handler = useCallback(function (event) { return onChange(event.target.value); }, [
        onChange,
    ]);
    return (React.createElement(Placeholder, { isLoading: isLoading, width: "100%", height: "48px" },
        React.createElement(TextField, { value: value || '', onChange: handler, variant: "filled", label: label, error: !!error, helperText: error, size: "small", className: classNames(styles.input, 'feature-read__input feature-read__input_string'), fullWidth: true })));
});
export { StringInput };
