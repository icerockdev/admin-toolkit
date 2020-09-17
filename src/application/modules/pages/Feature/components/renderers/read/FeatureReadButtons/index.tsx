import React, { FC, useMemo } from 'react';
import { useFeature } from '~/utils/hooks';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@material-ui/core';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { useFeatureId } from '~/application/modules/pages/Feature/utils/hooks';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';

interface IProps {}

const FeatureReadButtons: FC<IProps> = observer(() => {
  const feature = useFeature();
  const id = useFeatureId();
  const editUrl = useMemo(() => `${feature.url}/${id}/${FeatureMode.update}`, [
    feature.url,
    id,
  ]);

  const canBeEdited =
    feature.features.update && feature.mode === FeatureMode.read;

  const canBeDeleted =
    feature.features.delete && feature.mode !== FeatureMode.create;

  return (
    <div className={classNames(styles.buttons, 'feature-read__buttons')}>
      {canBeDeleted && (
        <Button variant="outlined" color="secondary" startIcon={<Delete />}>
          Удалить
        </Button>
      )}

      {canBeEdited && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          to={editUrl}
          component={Link}
          startIcon={<Edit />}
        >
          Изменить
        </Button>
      )}
    </div>
  );
});

export { FeatureReadButtons };
