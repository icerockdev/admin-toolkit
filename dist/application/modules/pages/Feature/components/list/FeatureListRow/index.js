import React, { useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { useFeature } from '../../../../../../utils/hooks';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import classNames from 'classnames';
var FeatureListRow = observer(function (_a) {
    var values = _a.values;
    var feature = useFeature();
    var fields = feature.fieldsOfCurrentMode;
    var history = useHistory();
    var onClick = useCallback(function () {
        var id = values.id || 0;
        if (feature.api.availableApiFeatures.read) {
            feature.goToRead(id);
        }
        else if (feature.api.availableApiFeatures.update) {
            feature.goToUpdate(id);
        }
    }, [feature.url, history, values]);
    return (React.createElement(TableRow, { className: "feature-list__field-value-row", onClick: onClick, hover: true }, fields.map(function (field) { return (React.createElement(TableCell, { key: field.name, className: classNames('feature-list__field-value', "feature-list__field-value_" + field.name) },
        React.createElement(field.List, { value: values[field.name] }))); })));
});
export { FeatureListRow };
