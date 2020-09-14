import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { useEntity } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const CrudlListTitle: CrudlListRendererProps['title'] = observer(() => {
  const entity = useEntity();

  return (
    <h1 className={classNames(styles.title, 'crudl-list__title')}>
      {entity.title}
      {entity.storage.isLoading ? ' (loading)' : null}
    </h1>
  );
});

export { CrudlListTitle };
