import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@material-ui/core';
import { FeatureAction } from '~/application/modules/pages/Feature/types';
import { useEntityId } from '~/application/modules/pages/Feature/utils/hooks';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';

interface IProps {}

const FeatureReadButtons: FC<IProps> = observer(() => {
  const entity = useEntity();
  const id = useEntityId();
  const editUrl = useMemo(() => `${entity.url}/${id}/${FeatureAction.update}`, [
    entity.url,
    id,
  ]);

  return (
    <div className={classNames(styles.buttons, 'feature-read__buttons')}>
      {entity.features.delete && (
        <Button variant="outlined" color="secondary" startIcon={<Delete />}>
          Удалить
        </Button>
      )}

      {entity.features.update && (
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
