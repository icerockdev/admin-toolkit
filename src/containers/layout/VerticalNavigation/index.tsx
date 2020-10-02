import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface IProps {}

const VerticalNavigation: FC<IProps> = observer(() => {
  const config = useConfig();

  return (
    <div className={classNames(styles.navigation, 'vertical-navigation')}>
      {config.linksForCurrentUser.map((link) => (
        <NavLink
          to={link.url}
          className={classNames(styles.link, 'vertical-navigation__link')}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
});

export { VerticalNavigation };
