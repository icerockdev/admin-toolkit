import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '~/application/utils/hooks';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/components/list/FeatureListRenderer';

const FeatureListFilters: FeatureListRendererProps['filters'] = observer(() => {
  const feature = useFeature();

  return (
    <div className={classNames(styles.fitlers, 'feature-list__filters')}>
      {feature.filters.Filters}
    </div>
  );
});

export { FeatureListFilters };
