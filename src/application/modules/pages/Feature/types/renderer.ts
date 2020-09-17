import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FC } from 'react';
import { FeatureMode } from '~/application/modules/pages/Feature/types/index';

export interface FeatureRendererProps {
  list?: Partial<FeatureListRendererProps>;
  read?: Partial<FeatureReadRendererProps>;
  renderers?: Partial<
    Record<'list' | 'read' | 'update' | 'create', FeatureRendererComponent>
  >;
}

export type FeatureListRendererProps = Record<
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

export type FeatureReadRendererProps = Record<
  | 'wrapper'
  | 'header'
  | 'footer'
  | 'title'
  | 'buttons'
  | 'breadcrumbs'
  | 'content'
  | 'submit',
  FC
> & {
  container: FC<{
    title: FC;
    buttons: FC;
    breadcrumbs: FC;
    submit: FC;
  }>;
};

export type FeatureRendererReaction = (
  action: FeatureMode,
  id: number | null
) => void;
