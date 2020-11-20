/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useFeature } from '~/application/utils/hooks';
import { useLocation } from 'react-router';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import {
  FeatureRendererProps,
  FeatureRendererReaction,
} from '~/application/modules/pages/Feature/types/renderer';
import { FeatureListRendererComponent } from '~/application/modules/pages/Feature/components/list/FeatureListRenderer';
import { FeatureReadRendererComponent } from '~/application/modules/pages/Feature/components/read/FeatureReadRenderer';

interface IProps {
  list: FeatureListRendererComponent;
  read: FeatureReadRendererComponent;
  update: FeatureReadRendererComponent;
  create: FeatureReadRendererComponent;
  components: FeatureRendererProps['components'];
}

const FeatureRendererRouter: FC<IProps> = observer(
  ({ list: List, read: Read, create: Create, update: Update, components }) => {
    const location = useLocation();
    const feature = useFeature();

    const id = feature.controller.getIdFromUrl();

    const mode = useMemo<FeatureMode>(() => {
      switch (location.pathname) {
        case `${feature.url}/${FeatureMode.create}/`:
        case `${feature.url}/${FeatureMode.create}`:
          return FeatureMode.create;
        case `${feature.url}/${id}/${FeatureMode.update}/`:
        case `${feature.url}/${id}/${FeatureMode.update}`:
          return FeatureMode.update;
        case `${feature.url}/${id}/`:
        case `${feature.url}/${id}`:
          return FeatureMode.read;
        default:
          return FeatureMode.list;
      }
    }, [feature, location.pathname, id]);

    const onEnter = useCallback<FeatureRendererReaction>(() => {
      feature.mode = mode;
    }, [feature, mode]);

    useEffect(() => {
      onEnter(mode, id);
    }, [mode, id]);

    const { features, url } = feature;

    return (
      <Switch>
        <Route
          exact
          path={feature.url}
          render={() => <List {...(components?.list || {})} />}
        />

        {features.read && (
          <Route
            exact
            path={`${url}/:id`}
            render={() => <Read {...(components?.read || {})} />}
          />
        )}

        {features.create && (
          <Route
            exact
            path={`${url}/${FeatureMode.create}`}
            render={() => <Create {...(components?.create || {})} />}
          />
        )}

        {features.update && (
          <Route
            exact
            path={`${url}/:id/${FeatureMode.update}`}
            render={() => <Update {...(components?.update || {})} />}
          />
        )}

        <Redirect to={feature.url || ''} />
      </Switch>
    );
  }
);

export { FeatureRendererRouter };
