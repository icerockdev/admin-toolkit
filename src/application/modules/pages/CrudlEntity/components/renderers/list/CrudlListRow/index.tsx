import React, { FC, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { useEntity } from '~/utils/hooks';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { useHistory } from 'react-router';

interface IProps {
  values: Record<string, any>;
}

const CrudlListRow: FC<IProps> = observer(({ values }) => {
  const entity = useEntity<CrudlEntity<any>>();
  const fields = entity.fieldsList.filter(
    (field) => field.showInList
  ) as CrudlField[];

  const history = useHistory();

  const onClick = useCallback(() => {
    const id = values.id || 0;
    history.push(`${entity.url}/${id}/`);
  }, [entity.url, history, values]);

  return (
    <TableRow className="crudl-list__field-value-row" onClick={onClick}>
      {fields.map((field) => (
        <TableCell
          key={field.name}
          className={classNames(
            'crudl-list__field-value',
            `crudl-list__field-value_${field.name}`
          )}
        >
          <field.List
            name={field.name}
            label={field.options.label}
            value={values[field.name]}
          />
        </TableCell>
      ))}
    </TableRow>
  );
});

export { CrudlListRow };
