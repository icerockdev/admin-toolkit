import React, { PureComponent } from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { withEntity } from '~/application/modules/pages/CrudlEntity/utils/withEntity';
import { observer } from 'mobx-react';

interface IProps {
  list: CrudlRendererComponent;
  entity: CrudlEntity;
}

@observer
class CrudlRendererRouterUnconnected extends PureComponent<IProps> {
  render() {
    const { entity, list } = this.props;

    return (
      <>
        <h1>{entity.title} (remove it)</h1>

        <Switch>
          <Route path={entity.url} component={list.output} />

          {/*{features.read && (*/}
          {/*  <Route path={`${url}/:id`} component={this.readComponent.render} />*/}
          {/*)}*/}

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
      </>
    );
  }
}

const CrudlRendererRouter = withEntity(CrudlRendererRouterUnconnected);

export { CrudlRendererRouter };
