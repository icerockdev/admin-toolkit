import React, { FC, useCallback } from 'react';
import { useFeature } from '~/utils/hooks';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@material-ui/core';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { Delete, Edit } from '@material-ui/icons';

interface IProps {}

const FeatureReadButtons: FC<IProps> = observer(() => {
  const feature = useFeature();

  const canBeEdited =
    feature.features.update &&
    feature.mode === FeatureMode.read &&
    feature.api.availableFeatures.update;

  const canBeDeleted =
    feature.features.delete &&
    feature.mode !== FeatureMode.create &&
    feature.api.availableFeatures.delete;

  const onDelete = useCallback(() => {
    if (!window.confirm('Действительно хотите удалить?')) return;
    feature.controller.delete();
  }, [feature.controller]);

  const onEdit = useCallback(() => {
    feature.goToUpdate(feature.controller.getIdFromUrl());
  }, [feature]);

  return (
    <div className={classNames(styles.buttons, 'feature-read__buttons')}>
      {canBeDeleted && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Delete />}
          type="button"
          onClick={onDelete}
        >
          Удалить
        </Button>
      )}

      {canBeEdited && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onEdit}
          startIcon={<Edit />}
        >
          Изменить
        </Button>
      )}
    </div>
  );
});

export { FeatureReadButtons };
