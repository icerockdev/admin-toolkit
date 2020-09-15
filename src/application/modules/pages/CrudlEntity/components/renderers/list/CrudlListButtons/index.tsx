import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';

const CrudlListButtons: CrudlListRendererProps['buttons'] = observer(() => {
  const entity = useEntity();

  const { create, export: exp } = entity.features;

  return (
    <div className={classNames(styles.buttons, 'crudl-list__buttons')}>
      {(exp || true) && (
        <Button variant="outlined" color="primary">
          <ImportExport />
        </Button>
      )}

      {create && (
        <form action={`${entity.url}/${CrudlActionEnum.create}`}>
          <Button variant="contained" color="primary" type="submit">
            <NoteAdd />
          </Button>
        </form>
      )}
    </div>
  );
});

export { CrudlListButtons };
