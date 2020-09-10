import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { CrudlListHeader } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListHeader';

export interface CrudlRendererProps {
  components?: {
    list: CrudlRendererComponent;
    read: CrudlRendererComponent;
    update: CrudlRendererComponent;
    create: CrudlRendererComponent;
  };
}

export interface CrudlListRendererProps {
  header?: typeof CrudlListHeader;
  footer?: typeof CrudlListHeader;
}
