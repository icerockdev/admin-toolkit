import React, { FC } from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const CrudlListContainer: CrudlListRendererProps['container'] = ({
  title: Title,
  buttons: Buttons,
  filters: Filters,
  children,
}) => (
  <div className={classNames(styles.grid, 'crudl-list__container-grid')}>
    <div className={classNames(styles.title, 'crudl-list__title')}>
      <Title />
    </div>

    <div className={classNames(styles.buttons, 'crudl-list__buttons')}>
      <Buttons />
    </div>

    <div className={classNames(styles.filters, 'crudl-list__filters')}>
      <Filters />
    </div>

    <div
      className={classNames(styles.content, 'crudl-list__container-content')}
    >
      {children}
    </div>
  </div>
);

export { CrudlListContainer };
