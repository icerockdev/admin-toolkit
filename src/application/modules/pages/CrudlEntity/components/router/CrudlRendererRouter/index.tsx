import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import { useLocation } from 'react-router';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';
import { CrudlRendererReaction } from '~/application/modules/pages/CrudlEntity/types/renderer';

interface IProps {
  list: CrudlRendererComponent;
  read: CrudlRendererComponent;
}

const CrudlRendererRouter: FC<IProps> = observer(({ list, read }) => {
  const location = useLocation();
  const entity = useEntity();

  const id = useMemo(() => {
    const re = new RegExp(`${entity.url.replace(/\//gim, '\\/')}\\\/([^/]+)`);
    const match = location.pathname.match(re);

    return parseInt((match && match[1]) || '', 10) || null;
  }, [location.pathname]);

  const action = useMemo<CrudlActionEnum>(() => {
    switch (location.pathname) {
      case `${entity.url}/${id}/edit`:
        return CrudlActionEnum.update;
      case `${entity.url}/${id}/create`:
        return CrudlActionEnum.create;
      case `${entity.url}/${id}/`:
        return CrudlActionEnum.read;
      default:
        return CrudlActionEnum.list;
    }
  }, [entity, location.pathname, id]);

  const onEnter = useCallback<CrudlRendererReaction>(
    () => (entity.mode = action),
    [entity, action]
  );

  useEffect(() => {
    onEnter(action, id);
  }, [action]);

  const { features, url } = entity;

  return (
    <Switch>
      <Route
        path={`${entity.url}/:id/edit`}
        component={() => <div>EDIT</div>}
        exact
      />

      <Route path={entity.url} component={list.output} exact />

      {features.read && <Route path={`${url}/:id`} component={read.output} />}

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

export { CrudlRendererRouter };
