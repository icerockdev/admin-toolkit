import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import { useLocation } from 'react-router';
import { FeatureAction } from '~/application/modules/pages/Feature/types';
import { FeatureRendererReaction } from '~/application/modules/pages/Feature/types/renderer';

interface IProps {
  list: FeatureRendererComponent;
  read: FeatureRendererComponent;
}

const FeatureRendererRouter: FC<IProps> = observer(({ list, read }) => {
  const location = useLocation();
  const entity = useEntity();

  const id = entity.controller.getIdFromUrl();

  const action = useMemo<FeatureAction>(() => {
    switch (location.pathname) {
      case `${entity.url}/${id}/edit`:
        return FeatureAction.update;
      case `${entity.url}/${id}/create`:
        return FeatureAction.create;
      case `${entity.url}/${id}/`:
        return FeatureAction.read;
      default:
        return FeatureAction.list;
    }
  }, [entity, location.pathname, id]);

  const onEnter = useCallback<FeatureRendererReaction>(() => {
    entity.mode = action;
  }, [entity, action]);

  useEffect(() => {
    onEnter(action, id);
  }, [action, id]);

  const { features, url } = entity;

  return (
    <Switch>
      <Route
        path={`${entity.url}/:id/edit`}
        component={() => <div>EDIT</div>}
        exact
      />

      <Route path={entity.url} component={list.output} exact />

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

      <Redirect to={entity.url || ''} />
    </Switch>
  );
});

export { FeatureRendererRouter };
