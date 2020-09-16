import React from 'react';
import { CrudlReadRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';

const CrudlReadContainer: CrudlReadRendererProps['container'] = ({
  title: Title,
  buttons: Buttons,
  breadcrumbs: Breadcrumbs,
  children,
}) => (
  <div className={classNames(styles.wrap, 'crudl-read__container-wrap')}>
    <div className={classNames(styles.breadcrumbs, 'crudl-read__breadcrumbs')}>
      <Breadcrumbs />
    </div>

    <Paper>
      <div className={classNames(styles.header, 'crudl-read__header')}>
        <div className={classNames(styles.title, 'crudl-read__title')}>
          <Title />
        </div>

        <div className={classNames(styles.buttons, 'crudl-read__buttons')}>
          <Buttons />
        </div>
      </div>

      <div
        className={classNames(styles.content, 'crudl-read__container-content')}
      >
        {children}
      </div>
    </Paper>
  </div>
);

export { CrudlReadContainer };
