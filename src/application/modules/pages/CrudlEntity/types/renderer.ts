import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { FC } from 'react';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types/index';

export interface CrudlRendererProps {
  list?: Partial<CrudlListRendererProps>;
  renderers?: Partial<
    Record<'list' | 'read' | 'update' | 'create', CrudlRendererComponent>
  >;
}

export type CrudlListRendererProps = Record<
  | 'header'
  | 'footer'
  | 'title'
  | 'buttons'
  | 'wrapper'
  | 'filters'
  | 'pagination'
  | 'table',
  FC
> & {
  container: FC<{
    title: FC;
    buttons: FC;
    filters: FC;
  }>;
};

export type CrudlRendererReaction = (
  action: CrudlActionEnum,
  id: number | null
) => void;
