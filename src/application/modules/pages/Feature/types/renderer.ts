import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FC } from 'react';
import { FeatureMode } from '~/application/modules/pages/Feature/types/index';
import { FeatureListRendererComponent } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';

export interface FeatureRendererProps {
  list?: FeatureListRendererComponent;
  read?: Partial<FeatureReadRendererProps>;
  create?: Partial<FeatureCreateRendererProps>;
  update?: Partial<FeatureUpdateRendererProps>;
  renderers?: Partial<
    Record<'read' | 'update' | 'create', FeatureRendererComponent>
  > & {
    list: FeatureListRendererComponent;
  };
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

export type FeatureUpdateRendererProps = FeatureReadRendererProps;
export type FeatureCreateRendererProps = FeatureUpdateRendererProps;

export type FeatureRendererReaction = (
  action: FeatureMode,
  id: number | null
) => void;
