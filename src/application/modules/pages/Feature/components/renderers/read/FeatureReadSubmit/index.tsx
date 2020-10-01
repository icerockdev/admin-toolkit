import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import { useFeature } from '~/utils/hooks';
import { FeatureMode } from '~/application/modules/pages/Feature/types';

interface IProps {}

const FeatureReadSubmit: FC<IProps> = observer(() => {
  const feature = useFeature();

  if (!feature.isEditing) return <Fragment />;

  return (
    <div className={classNames(styles.submit, 'feature-read__submit')}>
      <Button
        variant="outlined"
        color="default"
        onClick={feature.cancelEditing}
        type="button"
      >
        Отмена
      </Button>

      <Button variant="contained" color="primary" type="submit">
        {feature.mode === FeatureMode.create ? 'Создать' : 'Сохранить'}
      </Button>
    </div>
  );
});

export { FeatureReadSubmit };
