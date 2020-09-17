import React, { FC, useMemo } from 'react';
import { useFeature } from '~/utils/hooks';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {}

const FeatureReadTitle: FC<IProps> = observer(() => {
  const feature = useFeature();

  const title = useMemo(() => feature.getItemTitle(feature.data.read), [
    feature.data.read,
  ]);

  return (
    <div className={classNames(styles.title, 'feature-read__title')}>
      {feature.data.isLoading ? (
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
