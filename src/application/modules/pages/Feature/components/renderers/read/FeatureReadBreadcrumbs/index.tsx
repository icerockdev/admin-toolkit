import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { Link } from '@material-ui/core';
import classNames from 'classnames';
import { useFeature } from '~/utils/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { useFeatureId } from '~/application/modules/pages/Feature/utils/hooks';

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

  const id = useFeatureId();

  return (
    <div
      className={classNames(styles.breadcrumbs, 'feature-read__breadcrumbs')}
    >
      <Link to={feature.url} component={RouterLink} className={styles.entity}>
        {feature.title}
      </Link>

      {feature.mode !== FeatureMode.create && (
        <>
          {(title || feature.data.isLoading) && (
            <div className={styles.crumb} />
          )}

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
        </>
      )}

      {!!mode && (
        <>
          <div className={styles.crumb} />
          <div className={styles.mode}>{mode}</div>
        </>
      )}
    </div>
  );
});

export { FeatureReadBreadcrumbs };
