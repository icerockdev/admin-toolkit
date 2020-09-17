import React from 'react';
import { FeatureReadRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';

const FeatureReadContainer: FeatureReadRendererProps['container'] = ({
  title: Title,
  buttons: Buttons,
  breadcrumbs: Breadcrumbs,
  children,
}) => (
  <div className={classNames(styles.wrap, 'feature-read__container-wrap')}>
    <div
      className={classNames(styles.breadcrumbs, 'feature-read__breadcrumbs')}
    >
      <Breadcrumbs />
    </div>

    <Paper>
      <div className={classNames(styles.header, 'feature-read__header')}>
        <div className={classNames(styles.title, 'feature-read__title')}>
          <Title />
        </div>

        <div className={classNames(styles.buttons, 'feature-read__buttons')}>
          <Buttons />
        </div>
      </div>

      <div
        className={classNames(
          styles.content,
          'feature-read__container-content'
        )}
      >
        {children}
      </div>
    </Paper>
  </div>
);

export { FeatureReadContainer };
