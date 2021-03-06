/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '~/application/utils/hooks';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { observer } from 'mobx-react';
import { FeatureReadContainerProps } from '~/application/modules/pages/Feature/components/read/FeatureReadRenderer';

const FeatureReadContainer: FC<FeatureReadContainerProps> = observer(
  ({
    title: Title,
    buttons: Buttons,
    breadcrumbs: Breadcrumbs,
    submit: Submit,
    children,
  }) => {
    const feature = useFeature();
    const isHeaderShown = feature.mode !== FeatureMode.create;

    return (
      <div className={classNames(styles.wrap, 'feature-read__container-wrap')}>
        <div
          className={classNames(
            styles.breadcrumbs,
            'feature-read__breadcrumbs'
          )}
        >
          <Breadcrumbs />
        </div>

        <div
          className={classNames(styles.container, 'feature-read__container')}
        >
          {isHeaderShown && (
            <div className={classNames(styles.header, 'feature-read__header')}>
              <div className={classNames(styles.title, 'feature-read__title')}>
                <Title />
              </div>

              <div
                className={classNames(styles.buttons, 'feature-read__buttons')}
              >
                <Buttons />
              </div>
            </div>
          )}

          <div
            className={classNames(
              styles.content,
              'feature-read__container-content'
            )}
          >
            {children}
          </div>

          <div className={classNames(styles.submit)}>
            <Submit />
          </div>
        </div>
      </div>
    );
  }
);

export { FeatureReadContainer };
