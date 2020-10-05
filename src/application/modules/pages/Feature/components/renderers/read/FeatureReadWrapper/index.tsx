import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '~/utils/hooks';

const FeatureReadWrapper: FC = ({ children }) => {
  const feature = useFeature();
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!feature.isEditing) return;

      feature.submitEditor();
    },
    [feature]
  );

  return (
    <form
      className={classNames(styles.wrap, 'feature-read__wrapper')}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export { FeatureReadWrapper };
