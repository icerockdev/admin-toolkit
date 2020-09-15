import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { computed, observable } from 'mobx';
import React from 'react';
import { pickBy } from 'ramda';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { CrudlFiltersRenderer } from '~/application/modules/pages/CrudlEntity/components/filters/CrudlFiltersRenderer';
import qs from 'query-string';

export class CrudlFilters<F extends Record<string, any> = Record<string, any>> {
  constructor(protected entity: CrudlEntity<F>) {}

  @observable value: Record<string, string> = {};
  @observable selected: string[] = [];

  @computed
  get fields(): Record<string, CrudlField<F>> {
    return pickBy((item: CrudlField<F>) => !!item.options.features?.filter)(
      this.entity.fields
    );
  }

  @computed
  get Filters() {
    return <CrudlFiltersRenderer />;
  }

  restoreFilters = () => {
    const { search } = window.location;

    const fields = qs.parse(search);

    if (!fields) return;

    Object.keys(fields).forEach((field: string) => {
      if (
        !Object.prototype.hasOwnProperty.call(this.fields, field) ||
        !this.fields[field]?.options?.features?.filter ||
        !(
          this.fields[field].allowEmptyFilter ||
          fields[field]?.toString()?.trim()
        )
      )
        return;

      this.value = { ...this.value, [field]: fields[field]?.toString() || '' };
      this.selected = [...this.selected, field];
    });
  };

  persistFilters = () => {
    const query = qs.stringify(this.value);
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    window.history.replaceState('', '', url);
  };
}
