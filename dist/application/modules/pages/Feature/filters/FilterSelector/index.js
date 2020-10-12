import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, ListItemText, Menu, MenuItem } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import styles from './styles.module.scss';
var FilterSelector = observer(function (_a) {
    var fields = _a.fields, selected = _a.selected, onSelect = _a.onSelect;
    var _b = useState(null), buttonRef = _b[0], setButtonRef = _b[1];
    var onMenuOpen = useCallback(function (event) { return setButtonRef(event.target); }, [
        setButtonRef,
    ]);
    var onMenuClose = useCallback(function (event) { return setButtonRef(null); }, [
        setButtonRef,
    ]);
    var onFieldSelect = useCallback(function (name) {
        onSelect(name);
        setButtonRef(null);
    }, [onSelect, setButtonRef]);
    var selectable = useMemo(function () { return fields.filter(function (field) { return !selected.includes(field.name); }); }, [fields, selected]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { "aria-controls": "customized-menu", "aria-haspopup": "true", variant: "outlined", color: "primary", onClick: onMenuOpen, className: styles.button, disabled: !selectable.length },
            React.createElement(FilterIcon, null)),
        buttonRef && (React.createElement(Menu, { id: "customized-menu", elevation: 0, getContentAnchorEl: null, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, anchorEl: buttonRef, onClose: onMenuClose, open: !!buttonRef }, selectable.map(function (field) { return (React.createElement(MenuItem, { key: field.name, onClick: function () { return onFieldSelect(field.name); } },
            React.createElement(ListItemText, { primary: field.label }))); })))));
});
export { FilterSelector };
