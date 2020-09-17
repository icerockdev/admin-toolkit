import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import { useLocation } from 'react-router';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { FeatureRendererReaction } from '~/application/modules/pages/Feature/types/renderer';

interface IProps {
  list: FeatureRendererComponent;
  read: FeatureRendererComponent;
  update: FeatureRendererComponent;
  create: FeatureRendererComponent;
}

const FeatureRendererRouter: FC<IProps> = observer(
  ({ list, read, create, update }) => {
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
      console.log('feature mode', mode);
      feature.mode = mode;
    }, [feature, mode]);

    useEffect(() => {
      onEnter(mode, id);
    }, [mode, id]);

    const { features, url } = feature;

    return (
      <Switch>
        <Route
          path={`${feature.url}/:id/edit`}
          component={() => <div>EDIT</div>}
          exact
        />

        <Route exact path={feature.url} component={list.output} />

        {features.read && (
          <Route exact path={`${url}/:id`} component={read.output} />
        )}

        {features.create && (
          <Route
            exact
            path={`${url}/${FeatureMode.create}`}
            component={create.output}
          />
        )}

        {features.update && (
          <Route
            exact
            path={`${url}/:id/${FeatureMode.update}`}
            component={update.output}
          />
        )}

        <Redirect to={feature.url || ''} />
      </Switch>
    );
  }
);

export { FeatureRendererRouter };
