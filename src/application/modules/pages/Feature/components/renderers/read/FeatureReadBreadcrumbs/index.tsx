import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { Link, Paper } from '@material-ui/core';
import classNames from 'classnames';
import { useEntity } from '~/utils/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {}

const FeatureReadBreadcrumbs: FC<IProps> = observer(() => {
  const entity = useEntity();

  const title = useMemo(() => entity.getItemTitle(entity.data.read), [
    entity.data.read,
  ]);

  return (
    <div
      className={classNames(styles.breadcrumbs, 'feature-read__breadcrumbs')}
    >
      <Link to={entity.url} component={RouterLink} className={styles.entity}>
        {entity.title}
      </Link>

      {!!title && <div className={styles.crumb}>/</div>}

      <div className={styles.current}>
        {entity.data.isLoading ? <Placeholder /> : title}
      </div>
    </div>
  );
});

export { FeatureReadBreadcrumbs };
