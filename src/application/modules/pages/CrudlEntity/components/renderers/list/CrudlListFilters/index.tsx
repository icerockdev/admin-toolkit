import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const CrudlListFilters: CrudlListRendererProps['filters'] = () => (
  <div className={classNames(styles.fitlers, 'crudl-list__filters')}>
    FILTERS
  </div>
);

export { CrudlListFilters };
