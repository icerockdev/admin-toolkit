import React, { useMemo } from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';
import { FeatureAction } from '~/application/modules/pages/Feature/types';
import { Link } from 'react-router-dom';

const FeatureListButtons: FeatureListRendererProps['buttons'] = observer(() => {
  const entity = useEntity();

  const { create, export: exp } = entity.features;
  const createUrl = useMemo(() => `${entity.url}/${FeatureAction.create}`, [
    entity.url,
  ]);

  return (
    <div className={classNames(styles.buttons, 'feature-list__buttons')}>
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

export { FeatureListButtons };
