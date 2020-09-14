import React from 'react';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const CrudlListButtons: CrudlListRendererProps['buttons'] = observer(() => (
  <div className={classNames(styles.buttons, 'crudl-list__buttons')}>
    BUTTONS
  </div>
));

export { CrudlListButtons };
