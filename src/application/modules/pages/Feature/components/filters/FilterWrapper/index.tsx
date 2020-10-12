import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';

interface IProps {
  onClear: () => void;
  inline?: boolean;
}

const FilterWrapper: FC<IProps> = ({ onClear, children, inline }) => (
  <div className={classNames(styles.filter, 'feature-filter-wrapper')}>
    <div className={classNames(styles.input, 'feature-filter-wrapper__input')}>
      {children}
    </div>

    {!inline && (
      <div
        className={classNames(styles.close, 'feature-filter-wrapper__close')}
        onClick={onClear}
      >
        <Close />
      </div>
    )}
  </div>
);

export { FilterWrapper };
