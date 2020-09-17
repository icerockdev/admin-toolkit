import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import { useLocation } from 'react-router';
import { FeatureAction } from '~/application/modules/pages/Feature/types';
import { FeatureRendererReaction } from '~/application/modules/pages/Feature/types/renderer';

interface IProps {
  list: FeatureRendererComponent;
  read: FeatureRendererComponent;
}

const FeatureRendererRouter: FC<IProps> = observer(({ list, read }) => {
  const location = useLocation();
  const feature = useFeature();

  const id = feature.controller.getIdFromUrl();

  const action = useMemo<FeatureAction>(() => {
    switch (location.pathname) {
      case `${feature.url}/${id}/edit`:
        return FeatureAction.update;
      case `${feature.url}/${id}/create`:
        return FeatureAction.create;
      case `${feature.url}/${id}/`:
        return FeatureAction.read;
      default:
        return FeatureAction.list;
    }
  }, [feature, location.pathname, id]);

  const onEnter = useCallback<FeatureRendererReaction>(() => {
    feature.mode = action;
  }, [feature, action]);

  useEffect(() => {
    onEnter(action, id);
  }, [action, id]);

  const { features, url } = feature;

  return (
    <Switch>
      <Route
        path={`${feature.url}/:id/edit`}
        component={() => <div>EDIT</div>}
        exact
      />

      <Route path={feature.url} component={list.output} exact />

      {features.read && (
        <Route path={`${url}/:id`} component={read.output} exact />
      )}

      {/*{features.create && (*/}
      {/*  <Route*/}
      {/*    path={`${url}/create`}*/}
      {/*    component={this.createComponent.render}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{features.update && (*/}
      {/*  <Route*/}
      {/*    path={`${url}/:id/edit`}*/}
      {/*    component={this.updateComponent.render}*/}
      {/*  />*/}
      {/*)}*/}

      <Redirect to={feature.url || ''} />
    </Switch>
  );
});

export { FeatureRendererRouter };
