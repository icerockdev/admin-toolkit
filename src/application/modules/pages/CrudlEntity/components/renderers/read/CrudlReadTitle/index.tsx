import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IProps {}

const CrudlReadTitle: FC<IProps> = () => {
  const entity = useEntity();
  const title = useMemo(() => {
    if (!entity.data.read.data) return entity.title;

    return entity.getItemTitle(entity.data.read.data) || entity.title;
  }, [entity.data.read]);

  return (
    <div className={classNames(styles.title, 'crudl-read__title')}>
      <h1>{title}</h1>
    </div>
  );
};

export { CrudlReadTitle };
