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

  const canCreate =
    feature.features.create && feature.api.availableFeatures.create;

  const canExport =
    feature.features.export && feature.api.availableFeatures.export;

  return (
    <div className={classNames(styles.buttons, 'feature-list__buttons')}>
      {canExport && (
        <Button variant="outlined" color="primary">
          <ImportExport />
        </Button>
      )}

      {canCreate && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={feature.goToCreate}
        >
          <NoteAdd />
        </Button>
      )}
    </div>
  );
});

export { FeatureListButtons };
