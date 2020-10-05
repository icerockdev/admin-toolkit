import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FeatureListRendererContainerProps } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';

const FeatureListContainer: FC<FeatureListRendererContainerProps> = ({
  title: Title,
  buttons: Buttons,
  filters: Filters,
  pagination: Pagination,
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

    <div
      className={classNames(
        styles.pagination,
        'feature-list__container-pagination'
      )}
    >
      <Pagination />
    </div>
  </div>
);

export { FeatureListContainer };
