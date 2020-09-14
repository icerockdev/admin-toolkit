import React, { FC } from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const CrudlListWrapper: CrudlListRendererProps['wrapper'] = ({ children }) => (
  <div className={classNames(styles.wrap, 'crudl-list__wrapper')}>
    {children}
  </div>
);

export { CrudlListWrapper };
