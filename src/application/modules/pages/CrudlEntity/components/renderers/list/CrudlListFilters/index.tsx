import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';

const CrudlListFilters: CrudlListRendererProps['filters'] = observer(() => {
  const entity = useEntity();

  return (
    <div className={classNames(styles.fitlers, 'crudl-list__filters')}>
      {entity.filters.Filters}
    </div>
  );
});

export { CrudlListFilters };
