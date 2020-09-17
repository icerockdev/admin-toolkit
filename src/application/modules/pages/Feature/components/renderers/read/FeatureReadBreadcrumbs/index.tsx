import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { Link, Paper } from '@material-ui/core';
import classNames from 'classnames';
import { useFeature } from '~/utils/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {}

const FeatureReadBreadcrumbs: FC<IProps> = observer(() => {
  const feature = useFeature();

  const title = useMemo(() => feature.getItemTitle(feature.data.read), [
    feature.data.read,
  ]);

  return (
    <div
      className={classNames(styles.breadcrumbs, 'feature-read__breadcrumbs')}
    >
      <Link to={feature.url} component={RouterLink} className={styles.entity}>
        {feature.title}
      </Link>

      {(title || feature.data.isLoading) && (
        <div className={styles.crumb}>/</div>
      )}

      <Placeholder width="120px" isLoading={feature.data.isLoading}>
        <div className={styles.current}>{title}</div>
      </Placeholder>
    </div>
  );
});

export { FeatureReadBreadcrumbs };
