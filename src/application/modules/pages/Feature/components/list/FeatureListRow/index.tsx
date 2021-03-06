/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { useFeature } from '~/application/utils/hooks';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import classNames from 'classnames';

interface IProps {
  values: Record<string, any>;
}

const FeatureListRow: FC<IProps> = observer(({ values }) => {
  const feature = useFeature();

  const fields = feature.fieldsOfCurrentMode;

  const history = useHistory();

  const onClick = useCallback(() => {
    const id = values.id || 0;

    if (feature.api.availableApiFeatures.read) {
      feature.goToRead(id);
    } else if (feature.api.availableApiFeatures.update) {
      feature.goToUpdate(id);
    }
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
