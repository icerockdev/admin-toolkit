import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { useEntity } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';

const CrudlListTitle: CrudlListRendererProps['title'] = () => {
  const entity = useEntity();

  return (
    <h1 className={classNames(styles.title, 'crudl-list__title')}>
      {entity.title}
    </h1>
  );
};

export { CrudlListTitle };
