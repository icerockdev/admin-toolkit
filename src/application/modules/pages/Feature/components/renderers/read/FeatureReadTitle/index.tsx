import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {}

const FeatureReadTitle: FC<IProps> = observer(() => {
  const entity = useEntity();

  const title = useMemo(() => entity.getItemTitle(entity.data.read), [
    entity.data.read,
  ]);

  return (
    <div className={classNames(styles.title, 'feature-read__title')}>
      {entity.data.isLoading ? (
        <h1>
          <Placeholder />
        </h1>
      ) : (
        title && <h1>{title}</h1>
      )}
    </div>
  );
});

export { FeatureReadTitle };
