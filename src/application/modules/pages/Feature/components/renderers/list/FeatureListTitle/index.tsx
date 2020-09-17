import React from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import { useFeature } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const FeatureListTitle: FeatureListRendererProps['title'] = observer(() => {
  const feature = useFeature();

  return (
    <h1 className={classNames(styles.title, 'feature-list__title')}>
      {feature.title}
    </h1>
  );
});

export { FeatureListTitle };
