import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { HorizontalNavigation } from '~/containers/layout/HorizontalNavigation';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {}

const HorizontalLayout: FC<IProps> = observer(({ children }) => {
  return (
    <div className={classNames(styles.layout, 'horizontal-layout')}>
      <div
        className={classNames(
          styles.navigation,
          'horizontal-layout__navigation'
        )}
      >
        <HorizontalNavigation />
      </div>

      <div className={classNames(styles.wrapper, 'horizontal-layout__wrapper')}>
        {children}
      </div>
    </div>
  );
});

export { HorizontalLayout };
