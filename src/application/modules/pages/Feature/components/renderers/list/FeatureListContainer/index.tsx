import React from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const FeatureListContainer: FeatureListRendererProps['container'] = ({
  title: Title,
  buttons: Buttons,
  filters: Filters,
  children,
}) => (
  <div className={classNames(styles.grid, 'feature-list__container-grid')}>
    <div className={classNames(styles.title, 'feature-list__title')}>
      <Title />
    </div>

    <div className={classNames(styles.buttons, 'feature-list__buttons')}>
      <Buttons />
    </div>

    <div className={classNames(styles.filters, 'feature-list__filters')}>
      <Filters />
    </div>

    <div
      className={classNames(styles.content, 'feature-list__container-content')}
    >
      {children}
    </div>
  </div>
);

export { FeatureListContainer };
