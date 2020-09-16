import React, { useMemo } from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';
import { Link } from 'react-router-dom';

const CrudlListButtons: CrudlListRendererProps['buttons'] = observer(() => {
  const entity = useEntity();

  const { create, export: exp } = entity.features;
  const createUrl = useMemo(() => `${entity.url}/${CrudlActionEnum.create}`, [
    entity.url,
  ]);

  return (
    <div className={classNames(styles.buttons, 'crudl-list__buttons')}>
      {(exp || true) && (
        <Button variant="outlined" color="primary">
          <ImportExport />
        </Button>
      )}

      {create && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          to={createUrl}
          component={Link}
        >
          <NoteAdd />
        </Button>
      )}
    </div>
  );
});

export { CrudlListButtons };
