import React, { PureComponent } from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { withEntity } from '~/application/modules/pages/CrudlEntity/utils/withEntity';

class CrudlListHeaderUnconnected extends PureComponent<{
  entity: CrudlEntity;
}> {
  render() {
    return (
      <div>
        <button onClick={() => (this.props.entity.title = 'AAAA')}>
          CHANGE
        </button>
      </div>
    );
  }
}

const CrudlListHeader = withEntity(CrudlListHeaderUnconnected);

export { CrudlListHeader };
