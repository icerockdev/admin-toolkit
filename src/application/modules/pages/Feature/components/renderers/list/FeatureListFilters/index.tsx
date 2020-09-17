import React from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';

const FeatureListFilters: FeatureListRendererProps['filters'] = observer(() => {
  const feature = useFeature();

  return (
    <div className={classNames(styles.fitlers, 'feature-list__filters')}>
      {feature.filters.Filters}
    </div>
  );
});

export { FeatureListFilters };
