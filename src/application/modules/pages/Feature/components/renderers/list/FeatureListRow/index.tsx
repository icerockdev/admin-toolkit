import React, { FC, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { useFeature } from '~/utils/hooks';
import { FeatureField } from '~/application/modules/pages/Feature/items/FeatureField';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { useHistory } from 'react-router';

interface IProps {
  values: Record<string, any>;
}

const FeatureListRow: FC<IProps> = observer(({ values }) => {
  const feature = useFeature();

  const fields = feature.fieldsList.filter(
    (field) => field.showInList
  ) as FeatureField[];

  const history = useHistory();

  const onClick = useCallback(() => {
    const id = values.id || 0;
    history.push(`${feature.url}/${id}/`);
  }, [feature.url, history, values]);

  return (
    <TableRow className="feature-list__field-value-row" onClick={onClick} hover>
      {fields.map((field) => (
        <TableCell
          key={field.name}
          className={classNames(
            'feature-list__field-value',
            `feature-list__field-value_${field.name}`
          )}
        >
          <field.List value={values[field.name]} />
        </TableCell>
      ))}
    </TableRow>
  );
});

export { FeatureListRow };
