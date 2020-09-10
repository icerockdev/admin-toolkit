import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import React from 'react';
import { computed } from 'mobx';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { CrudlListHeader } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListHeader';

export class CrudlListRenderer extends CrudlRendererComponent {
  constructor(props?: CrudlListRendererProps) {
    super();

    if (props?.header) this.Header = props.header;
    if (props?.footer) this.Footer = props.footer;
  }

  Header = CrudlListHeader;
  Footer = CrudlListHeader;

  @computed
  get output() {
    return () => (
      <div>
        <this.Header />
        <div>List for entity</div>
        <button>Change entity title</button>
      </div>
    );
  }
}
