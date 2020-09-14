import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {}

const CrudlListPagination: FC<IProps> = () => (
  <>
    <div
      className={classNames(
        styles.placeholder,
        'crudl-list__pagination-placeholder'
      )}
    />

    <div
      className={classNames(styles.floater, 'crudl-list__pagination_floater')}
    />
  </>
);

export { CrudlListPagination };
