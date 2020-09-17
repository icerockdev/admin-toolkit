import React from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import { useEntity } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const FeatureListTitle: FeatureListRendererProps['title'] = observer(() => {
  const entity = useEntity();

  return (
    <h1 className={classNames(styles.title, 'feature-list__title')}>
      {entity.title}
      {entity.data.isLoading ? ' (loading)' : null}
    </h1>
  );
});

export { FeatureListTitle };
