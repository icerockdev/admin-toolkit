import React, { FC, useMemo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { Link } from 'react-router-dom';

const FeatureListButtons: FC = observer(() => {
  const feature = useFeature();

  const { create, export: exp } = feature.features;
  const createUrl = useMemo(() => `${feature.url}/${FeatureMode.create}`, [
    feature.url,
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
