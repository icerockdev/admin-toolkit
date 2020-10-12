import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import { Button } from '@material-ui/core';
import { ImportExport, NoteAdd } from '@material-ui/icons';

const FeatureListButtons: FC = observer(() => {
  const feature = useFeature();

  const canBeCreated =
    feature.features.create && feature.api.availableApiFeatures.create;

  const canBeExported =
    feature.features.export && feature.api.availableApiFeatures.export;

  return (
    <div className={classNames(styles.buttons, 'feature-list__buttons')}>
      {canBeExported && (
        <Button variant="outlined" color="primary">
          <ImportExport />
        </Button>
      )}

      {canBeCreated && (
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
