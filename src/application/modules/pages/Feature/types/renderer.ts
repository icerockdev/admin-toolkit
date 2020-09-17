import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FC } from 'react';
import { FeatureAction } from '~/application/modules/pages/Feature/types/index';
import { FeatureReadContentRenderer } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadContentRenderer';

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
  'wrapper' | 'header' | 'footer' | 'title' | 'buttons' | 'breadcrumbs',
  FC
> & {
  container: FC<{
    title: FC;
    buttons: FC;
    breadcrumbs: FC;
  }>;
  renderer: FeatureReadContentRenderer;
};

export type FeatureRendererReaction = (
  action: FeatureAction,
  id: number | null
) => void;
