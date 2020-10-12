import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { Breadcrumbs, Link } from '@material-ui/core';
import classNames from 'classnames';
import { useFeature } from '~/application/utils/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { useRouteMatch } from 'react-router';

interface IProps {}

const FeatureReadBreadcrumbs: FC<IProps> = observer(() => {
  const feature = useFeature();

  const title = useMemo(() => feature.getItemTitle(feature.data.read), [
    feature.data.read,
  ]);

  const mode = useMemo(() => {
    switch (feature.mode) {
      case FeatureMode.update:
        return 'Редактирование';
      case FeatureMode.create:
        return 'Создание';
      default:
        return null;
    }
  }, [feature.mode]);

  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
      className={classNames(styles.breadcrumbs, 'feature-read__breadcrumbs')}
    >
      <Link
        to={feature.filters.queryString}
        component={RouterLink}
        className={styles.entity}
      >
        <b>{feature.title}</b>
      </Link>

      {feature.mode !== FeatureMode.create && (
        <Placeholder width="120px" isLoading={feature.data.isLoading}>
          <div className={styles.current}>
            {!!mode ? (
              <Link to={`${feature.url}/${id}`} component={RouterLink}>
                {title}
              </Link>
            ) : (
              title
            )}
          </div>
        </Placeholder>
      )}

      {!!mode && <div className={styles.mode}>{mode}</div>}
    </Breadcrumbs>
  );
});

export { FeatureReadBreadcrumbs };
