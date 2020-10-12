import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';

interface IProps {}

const EntityListWrapper: FC<IProps> = observer(({ children }) => (
  <div className={styles.wrap}>{children}</div>
));

export { EntityListWrapper };
