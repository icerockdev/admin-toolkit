/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { Fragment } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useFeature } from '~/application/utils/hooks';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/components/list/FeatureListRenderer';

const FeatureListFilters: FeatureListRendererProps['filters'] = observer(() => {
  const feature = useFeature();

  if (!feature.filters.fieldsList.length) return <Fragment />;

  return (
    <div className={classNames(styles.fitlers, 'feature-list__filters')}>
      {feature.filters.Filters}
    </div>
  );
});

export { FeatureListFilters };
