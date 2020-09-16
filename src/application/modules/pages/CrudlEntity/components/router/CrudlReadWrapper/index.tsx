import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const CrudlReadWrapper: CrudlListRendererProps['wrapper'] = ({ children }) => (
  <div className={classNames(styles.wrap, 'crudl-read__wrapper')}>
    {children}
  </div>
);

export { CrudlReadWrapper };
