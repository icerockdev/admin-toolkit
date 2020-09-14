import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { FC } from 'react';

export interface CrudlRendererProps {
  components?: {
    list: CrudlRendererComponent;
    read: CrudlRendererComponent;
    update: CrudlRendererComponent;
    create: CrudlRendererComponent;
  };
}

export type CrudlListRendererProps = Record<
  | 'header'
  | 'footer'
  | 'title'
  | 'buttons'
  | 'wrapper'
  | 'filters'
  | 'pagination',
  FC
> & {
  container: FC<{
    title: FC;
    buttons: FC;
    filters: FC;
  }>;
};
