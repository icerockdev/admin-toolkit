import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { computed, observable } from 'mobx';
import React from 'react';
import { pickBy } from 'ramda';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { CrudlFiltersRenderer } from '~/application/modules/pages/CrudlEntity/components/renderers/filters/CrudlFiltersRenderer';

export class CrudlFilters<F extends Record<string, any> = Record<string, any>> {
  constructor(protected entity: CrudlEntity<F>) {}

  @observable value: Record<string, string> = {};
  @observable selected: string[] = [];

  @computed
  get fields() {
    return pickBy((item: CrudlField<F>) => !!item.options.features?.filter)(
      this.entity.fields
    );
  }

  @computed
  get Filters() {
    return <CrudlFiltersRenderer />;
  }
}
