import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';

interface IProps {}

const CrudlReadTitle: FC<IProps> = observer(() => {
  const entity = useEntity();

  const title = useMemo(() => entity.getItemTitle(entity.data.read), [
    entity.data.read,
  ]);

  return (
    <div className={classNames(styles.title, 'crudl-read__title')}>
      {title && <h1>{title}</h1>}
    </div>
  );
});

export { CrudlReadTitle };
